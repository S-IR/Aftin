import {
  enhancerAuthor,
  enhancerOptionFields,
  enhancerType,
} from "../../../constants/image-enhancing/enhancingTypes";
import { changeModalType } from "../../../zustand/ModalBoxStore/store";

/**
 * Small function that determines the author of the model in order for it to be displayed on the page
 * @param name
 */
export const determineModelAuthor = (name: enhancerType): enhancerAuthor => {
  switch (name) {
    case "upscale":
      return "nightmareai";
    case "deblur":
    case "stylize":
      return "Gihyun Kwon, Jong Chul Ye";
  }
};
export const determineDefaultOptionFields = (
  enhancerType: enhancerType
): enhancerOptionFields => {
  switch (enhancerType) {
    case "upscale":
      return null;
    case "deblur":
      return { model: "Image Deblurring (GoPro)" };
    case "stylize":
      return { text: "" };
  }
};
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const loadImage = (src: string) => {
  return new Promise<{ src: string; width: number; height: number }>(
    (resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        resolve({
          src: img.src,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = (error) => {
        reject(error);
      };
    }
  );
};
/**
 * Handles the API request to replicate for any AI model
 * @param enhancerType describes what kind of transformation do you want the image to go through. Used to determine the route of the request
 * @param image the image that you want to be sent
 * @param otherFields other fields that are to be sent alongside the image
 * @param setError a setState that saves the text of the replicate error or displays a more user friendly text in case of an error on the prediction
 * @param setImageToDisplay toggles the 'before' and 'after' for the screen
 * @param setAfterImage setState that sets the new image sent by replicate
 * @param changeModalType used to display server error
 * @returns Sets the after image | sets the error text | sets the internal server error modal
 */
export const handleEnhanceAPIRequest = async (
  enhancerType: enhancerType,
  image: ArrayBuffer,
  otherFields: enhancerOptionFields,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setImageToDisplay: React.Dispatch<
    React.SetStateAction<"Before" | "After" | null>
  >,

  changeModalType: changeModalType
): Promise<{ src: string; width: number; height: number } | void> => {
  setImageToDisplay("After");

  const response = await fetch(
    `/api/products/image-tranasformations/${enhancerType}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, ...otherFields }),
    }
  );

  let prediction = await response.json();
  console.log("prediction", prediction);

  while (prediction.status !== "succeeded" && prediction.status !== "failed") {
    console.log("prediction", prediction);

    await sleep(1000);
    const response = await fetch(
      `/api/products/image-tranasformations/${prediction.id}`
    );
    prediction = await response.json();

    if (response.status === 500) {
      setImageToDisplay("Before");
      return changeModalType("server-error");
    }

    if (prediction.status === "failed") {
      setImageToDisplay("Before");
      return handleErrorText(prediction.error, setError);
    }

    const imageInfo = await loadImage(prediction.output);
    return imageInfo;
  }
};

/**
 * Sets a more user friendly text message depending on the error sent by replicate. Work in progress
 * @param error the replicate error
 * @param setError setState for the error set on screen
 * @returns sets the error to a particular string
 */
const handleErrorText = (
  error: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  switch (true) {
    case error.startsWith("CUDA out of memory"):
      return setError(
        `The image that you have sent is too large. Please send a smaller image`
      );
    default:
      return setError(error);
  }
};

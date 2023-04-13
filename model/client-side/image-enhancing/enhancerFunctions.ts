import {
  enhancerOptionFields,
  enhancerType,
} from "../../../constants/image-enhancing/enhancingTypes";
import { changeModalType } from "../../../zustand/ModalBoxStore/store";

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
  image: string | ArrayBuffer | null,
  otherFields: enhancerOptionFields,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setImageToDisplay: React.Dispatch<
    React.SetStateAction<"Before" | "After" | null>
  >,
  setAfterImage: React.Dispatch<
    React.SetStateAction<{
      src: string;
      width: number;
      height: number;
    } | null>
  >,
  changeModalType: changeModalType
): Promise<any> => {
  setImageToDisplay("After");
  setAfterImage(null);

  const response = await fetch(`/api/predictions/${enhancerType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, ...otherFields }),
  });

  let prediction = await response.json();
  console.log("prediction", prediction);

  while (prediction.status !== "succeeded" && prediction.status !== "failed") {
    console.log("prediction", prediction);

    await sleep(1000);
    const response = await fetch(`/api/predictions/${prediction.id}`);
    prediction = await response.json();

    if (response.status === 500) {
      setImageToDisplay("Before");
      return changeModalType("server-error");
    }

    if (prediction.status === "failed") {
      setImageToDisplay("Before");

      return handleErrorText(prediction.error, setError);
    }

    console.log("prediction", prediction);

    const img = new Image();

    img.src = prediction.output;
    img.onload = () =>
      setAfterImage({
        src: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
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

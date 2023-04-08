import {
  enhancerOptionFields,
  enhancerType,
} from "../../../constants/image-enhancing/enhancingTypes";

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

export const handleEnhanceAPIRequest = async (
  enhancerType: enhancerType,
  image: string | ArrayBuffer | null,
  otherFields: enhancerOptionFields,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setAfterImage: React.Dispatch<
    React.SetStateAction<{
      src: string;
      width: number;
      height: number;
    } | null>
  >
): Promise<any> => {
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
    const response = await fetch(
      `/api/predictions/${enhancerType}/${prediction.id}`
    );
    prediction = await response.json();
    if (response.status !== 200) {
      return setError(prediction.detail);
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

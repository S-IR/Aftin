import { addImage } from "../../../zustand/MockupsStore/store";

export const uploadImageToPreview = (
  ADD_IMAGE: addImage,
  imagesArray?: FileList | null,
  url?: string
) => {
  const image = new Image();
  if (imagesArray) {
    if (imagesArray.length > 1)
      return alert("Please upload a single image at a time");
    let selected = imagesArray[0];
    image.src = URL.createObjectURL(selected);
  } else if (url) {
    image.src = url;
  }
  image.onload = () => {
    ADD_IMAGE(image.src, image.width, image.height);
  };
};

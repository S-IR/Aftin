import React from "react";

export const uploadImage = (
  imagesArray: FileList | null,
  firstImage: boolean,
  setFirstImage: React.Dispatch<React.SetStateAction<boolean>>,
  setImages:React.Dispatch<React.SetStateAction<HTMLImageElement[]>>
  ) => {
  const image = new Image()
  if (imagesArray === null) return console.log('the images array is null')
  let selected = imagesArray[0];
  image.src = URL.createObjectURL(selected);
  image.onload = () => {
    if (!firstImage) {
      setFirstImage(true)
      setImages((prevImages):Array<HTMLImageElement> => {return [...prevImages, image]})
    } else {
      setImages((prevImages):Array<HTMLImageElement> => {return [...prevImages, image]})
    }
  }
  return firstImage
}
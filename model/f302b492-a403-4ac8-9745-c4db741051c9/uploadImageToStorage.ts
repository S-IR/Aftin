import axios from "axios";
import { addDoc, CollectionReference, DocumentData } from "firebase/firestore";
import { getDownloadURL, StorageReference, uploadBytesResumable } from "firebase/storage";
import { HTMLHexColor } from "../../typings/typings";
import { buildRgb, ColorQuantization, rgbArrayToHex } from "./buildRGB";

// Uploads an image to the firebase storage. Logs the progress and the potential errors
export const uploadImageToStorage = async (
  storageRef: StorageReference,
  file: any,
  doc: CollectionReference<DocumentData>,
  docFields: object,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>) => {
    
  if (!canvasRef.current) return console.log(`no canvas ref`)

  const uploadTask = uploadBytesResumable(storageRef, file)
  const url = uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log(error)
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {

        //Since we need to find the main colors of the image, we need to create a canvas and get the rgb data for each pixel. Then we do a median cut algorithm to find the colors that are most predominant. Now the value is hard coded at 3 (it's the second parameter of the ColorQuantization), which means it will return an array of 2. If it was 4 it would return 1, if it was 2 it would return 8 and so forth
        const image = new Image()
        const intermediateImgURL = URL.createObjectURL(file)
        image.src = intermediateImgURL
        image.onload = () => {
          canvasRef.current.width = image.width
          canvasRef.current.height = image.height
          const width = image.width
          const height = image.height
          const ctx = canvasRef.current?.getContext(`2d`)
          ctx.drawImage(image, 0, 0)
          const imageData = ctx.getImageData(0, 0, width, height);
          const rgbArray = buildRgb(imageData.data)
          const MainColors = ColorQuantization(rgbArray, 3);

          addDoc(doc, {
            ...docFields, color: MainColors, url
          })
          console.log(`finished uploading the image`);
          
        }
      });
    }
  )
}
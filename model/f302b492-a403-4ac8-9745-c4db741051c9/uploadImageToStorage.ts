import { addDoc, CollectionReference, DocumentData } from "firebase/firestore";
import { getDownloadURL, StorageReference, uploadBytesResumable } from "firebase/storage";

// Uploads an image to the firebase storage. Logs the progress and the potential errors
export const uploadImageToStorage = async ( storageRef: StorageReference, files: React.FormEvent<HTMLInputElement>,doc: CollectionReference<DocumentData>, docFields: object)=> {
  
  const uploadTask = uploadBytesResumable(storageRef, files[0], )
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
        addDoc(doc, {
          ...docFields, url
        }) 
      });
    }
  )
  }
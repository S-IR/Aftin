import { getDownloadURL, ref, uploadBytes, uploadBytesResumable, getStorage } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { createImageDoc, createUserDoc } from '../firebase';


const useImageUploadStorage = (props) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);


  useEffect( () => {

    //referneces
    const storage = getStorage()
    console.log(storage)
    const location = props.storage_address.concat('/', props.file.name)

    const storageRef = ref(storage, location);
    const uploadTask =  uploadBytesResumable(storageRef, props.file);

    uploadTask.on('state_changed',
      (snapshot) => {

        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setProgress(percentage);

      }, (err) => { setError(err) }, async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setUrl(url);
      })
  }, [props.file]);



  useEffect(() => {
    if (url === null) {
      return
    } else {
    createImageDoc(props.file.name, props.alt_text , props.checkbox, props.collection_name, props.description, url)
    }
    return () => {
      
    }
  }, [url])
  

  return { progress, url, error }



}
export default useImageUploadStorage;
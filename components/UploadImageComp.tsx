import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { db } from '../firebase'
import { determineInputs } from '../model/f302b492-a403-4ac8-9745-c4db741051c9/determineInput'
import { uploadImageToStorage } from '../model/f302b492-a403-4ac8-9745-c4db741051c9/uploadImageToStorage'
import { makeID } from '../model/GeneralFunctions'
import { LARGE_CATEGORY_OF_IMG, SMALL_CATEGORY_OF_IMG } from '../typings/image-types/ImageTypes'
import FirstDegreeInput from './UploadImage/FirstDegreeInput'
import SecondDegreeInput from './UploadImage/SecondDegreeInput'



export type UploadImgInputs = {
  files: any
  inputName: string
}


interface props {
  LARGE_CATEGORY_OF_IMG: LARGE_CATEGORY_OF_IMG
  SMALL_CATEGORY_OF_IMG: SMALL_CATEGORY_OF_IMG
}

const UploadImageComp = ({ LARGE_CATEGORY_OF_IMG, SMALL_CATEGORY_OF_IMG }: props) => {
  const canvasRef = useRef<React.MutableRefObject<HTMLCanvasElement | null>>(null)

  
  const [inputsArray, setInputsArray] = useState<null | [string | object]>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    
  } = useForm<UploadImgInputs>()


  useEffect(() => {
    const Array = determineInputs(LARGE_CATEGORY_OF_IMG, SMALL_CATEGORY_OF_IMG)
    setInputsArray(Array)


  }, [LARGE_CATEGORY_OF_IMG, SMALL_CATEGORY_OF_IMG])



  const doc = collection(db, `${LARGE_CATEGORY_OF_IMG}/${SMALL_CATEGORY_OF_IMG}/Images`)
  const storage = getStorage()

  const views = 0


  const [error, setError] = useState<null | string>(null);
  const [props, setProps] = useState([])

  // Based on the categories that are passed down , this array and switch statement will be our method of calculating what inputs need to appear on the screen
  const [disableUpload, setDisableUpload] = useState(false)

  const onSubmit: SubmitHandler<UploadImgInputs> = async ({files, ...imgFields}) => {
    
    Object.values(files).forEach((file, i) => {
      const storageRef = ref(storage, `product-images/${LARGE_CATEGORY_OF_IMG}/${SMALL_CATEGORY_OF_IMG}/${makeID(16)}.png`)
      setDisableUpload(true)
      const imgName = file.name.replace('.png', '')
      const description = `${LARGE_CATEGORY_OF_IMG} , ${SMALL_CATEGORY_OF_IMG}, ${imgName}`
      const docFields = { views, description, ...imgFields }
      uploadImageToStorage(storageRef, file, doc, docFields, canvasRef).then(()=>{ 
        setDisableUpload(false)
        alert(`finished uploading the ${i}th image`)
      })
    }
    
    )
    
  }

  if (!inputsArray) return <div>somehow this appeared without any inputs to show</div>
  return (
    <div className='w-full bg-gray-500'>
      <form onSubmit={handleSubmit(onSubmit)} className='sm:w-auto z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900  rounded-3xl space-y-8 md:max-w-md md:px-14 flex-row row-span-1 justify-center items-center text-white  p-4 mx-5'>
        <label className='inline-block w-full'>
          <input type="file" multiple placeholder='Upload Image' className='input' {...register("files", {
            required: true
          })} />
          {errors.files && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>
        {inputsArray.map((imgField, i) => {
          // if the field is not description or color scheme, make it appear on screen to be modified
          if (Object.keys(imgField)[0] === `color_scheme` ||
            (Object.keys(imgField)[0] === `description`)) return
        
            //
            const allowMultipleOptions = Object.keys(imgField)[0] !== `size` && Object.keys(imgField)[0] !== `surrounding_environment` && Object.keys(imgField)[0] !== `paid`
            return <FirstDegreeInput key={i}  allowMultipleOptions={allowMultipleOptions} imgField={imgField} register={register} errors={errors} />
        }

        )}
        <div className='flex justify-center items-center'>
          <button type='submit' disabled={disableUpload} className='general-buttons !m-0' >Upload</button>
        </div>
      </form>

      <canvas ref={canvasRef}  ></canvas>
    </div>
  )
}

export default UploadImageComp
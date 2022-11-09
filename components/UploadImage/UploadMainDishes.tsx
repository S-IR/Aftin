import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { db } from '../../firebase'
import { uploadImageToStorage } from '../../model/f302b492-a403-4ac8-9745-c4db741051c9/UploadImageToStorage'
import { makeID } from '../../model/GeneralFunctions'


type Inputs = {
  files: React.FormEvent<HTMLInputElement>[],
  description: string
  surrounding_environment: string
  dish_type: string
  resolution : string
}

const UploadMainDishes = () => {
  const NAME_OF_ = `Main Dishes`

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const doc = collection(db, `Stock Images/${NAME_OF_CATEGORY}/Images`)
  const storage = getStorage()
  // the upload name is a random string
  
  const storageRef = ref(storage, `public-images/stock-images/${NAME_OF_CATEGORY}/${makeID(16)}.png`)
  const views = 0


  const [error, setError] = useState<null | string>(null);
  const [props, setProps] = useState([])

  const onSubmit: SubmitHandler<Inputs> = async ({ files, description, dish_type, surrounding_environment, resolution }) => {
    const docFields = {description, dish_type, surrounding_environment, resolution}
    uploadImageToStorage(storageRef, files, doc, docFields)
  }


  return (
    <div className='w-full bg-gray-500'>
      <form onSubmit={handleSubmit(onSubmit)} className='sm:w-auto z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900  rounded-3xl space-y-8 md:max-w-md md:px-14 flex-row row-span-1 justify-center items-center text-white  p-4 mx-5'>

        <label className='inline-block w-full'>
          <input type="file" placeholder='files' className='input' {...register("files", {
            required: true
          })} />
          {errors.files && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>

        <label className='inline-block w-full'>
          <input type="text" placeholder='description' className='input' {...register("description", {
            required: true
          })} />
          {errors.description && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>

        <label className='inline-block w-full'>
          <input type="text" placeholder='surrounding_environment' className='input' {...register("surrounding_environment", {
            required: true
          })} />
          {errors.surrounding_environment && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>

        <label className='inline-block w-full'>
          <input type="text" placeholder='dish_type' className='input' {...register("dish_type", {
            required: true
          })} />
          {errors.dish_type && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>

        <label className='inline-block w-full'>
          <input type="text" placeholder='dish_type' className='input' {...register("dish_type", {
            required: true
          })} />
          {errors.dish_type && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>

        <label className='inline-block w-full'>
          <input type="text" placeholder='resolution' className='input' {...register("resolution", {
            required: true
          })} />
          {errors.resolution && <p className='p-1 text-[13px] text-orange-500'>
            Please enter a valid image</p>}
        </label>
        <div className='flex justify-center items-center'>
          <button type='submit' className='general-buttons !m-0' >Upload</button>
        </div>
      </form>

    </div>
  )
}

export default UploadMainDishes
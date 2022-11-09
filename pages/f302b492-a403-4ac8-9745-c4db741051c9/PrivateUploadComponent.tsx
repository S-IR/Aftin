import { React, useEffect, useRef, useState } from 'react'
import { getCookie, getCookies } from 'cookies-next';
import { SubmitHandler, useForm } from 'react-hook-form'
import ProgressBar from '../../components/UploadImages/ProgressBar';
import { text } from 'stream/consumers';
import { collection } from 'firebase/firestore';


function PrivateUploadComponent() {
  const [file, setFile] = useState<null | FormDataEntryValue>(null);
  const [error, setError] = useState(null);
  const [props, setProps] = useState([])

  const types = ['image/png', 'image/jpeg']


  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setError(null)
      setFile(selected);
    } else {
      setFile(null);
      setError('Please select a valid image file (png or jpeg)');
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setProps([])
    const data = new FormData(e.target)
    const sentData = Object.fromEntries(data.entries())
    const { alt_text, checkbox, collection_name, description, file, storage_address } = sentData
    setFile(file)
    let sentCheckbox = (checkbox === 'true')
    setProps({
      alt_text: alt_text,
      checkbox: sentCheckbox,
      collection_name: collection_name,
      description: description,
      file: file,
      storage_address: storage_address
    })
  }


  return (
    <div className='w-full bg-gray-500'>
      <form onSubmit={handleSubmit} className='sm:w-auto z-50 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900  rounded-3xl space-y-8 md:max-w-md md:px-14 flex-row row-span-1 justify-center items-center text-white  p-4 mx-5'>

        <input name='file' type="file" />


        <div className='flex space-x-4'>
          <input className='text-black' name='checkbox' type="text" />
          <p>Paid?</p>
        </div>

        <div className='flex space-x-4'>
          <input name='alt_text' className='text-black' type="text" />
          <p>alt text</p>
        </div>

        <div className='flex space-x-4 mt-2'>
          <input name='description' className='text-black' type="text" />
          <p>description</p>
        </div>
        <div className='flex space-x-4 mt-2'>
          <input name='collection_name' className='text-black' type="text" />
          <p>collection name</p>
        </div>
        <div className='flex space-x-4 mt-2'>
          <input name='storage_address' className='text-black' type="text" />
          <p>storage address</p>
        </div>

        <div className='flex space-x-4 mt-2'>
          <input name='storage_address' className='text-black' type="text" />
          <p>storage address</p>
        </div>
        <div className='flex justify-center items-center'>
          <button type='submit' className='general-buttons !m-0' >Upload photo</button>
        </div>

      </form>
      <div>
        {error && <div>{error} </div>}
        {file && <div> {file.name}</div>}
        {file && <ProgressBar {...props} setFile={setFile} />}

      </div>
    </div>
  )
}

export default PrivateUploadComponent
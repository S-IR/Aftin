import React, { useEffect } from 'react'
import useImageUploadStorage from '../../hooks/useImageUploadStorage'

const ProgressBar = (props: Array, ) => {

  const setFile = props.setFile

  const { url, progress } = useImageUploadStorage(props);


  useEffect(() => {
    if (url)
      setFile(null)

    return () => {

    }
  }, [url, setFile])


  return (
    <div className='flex justify-center bg-red-500 h-[5px] mt-[20px]' style={{ width: progress + '%' }} > </div>
  )
}

export default ProgressBar
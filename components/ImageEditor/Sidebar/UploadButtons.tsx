import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { uploadImageToCanvas } from '../../../model/image-editor/Upload'
import { activeSidebarType } from '../../../pages/image-editor'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'

interface props {

  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>
}


const UploadButtons = ({ setActiveSidebar }: props) => {
  const [pageId, setPageId] = useState(0)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImageToCanvas(dispatch, pageId, e.target.files,)
    setActiveSidebar('Stylize')
  }
  const pagesLength = useAppSelector(canvasPagesCount).present.pages.length


  const optionValues: number[] = []
  for (let i = 0; i < pagesLength; i++) {
    optionValues.push(i)
  }




  const dispatch = useAppDispatch();
  return (
    <div className='text-white flex flex-col pt-10 items-center h-[100vh] w-auto bg-gradient-to-br bg-white drop-shadow-xl shadow-white'>
      <label
        htmlFor="image_input"
        className='block mb-2 text-4xl text-black font-serif font-[800] dark:text-gray-300 md:text-xl pt-2 '
      >
        Upload Image
      </label>
      <input className="p-4 rounded cursor-pointer  " id="image_input"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleUpload(e)}
      ></input>
      {pagesLength > 1 && <FormControl fullWidth>
        <InputLabel className='my-2' id="pageId-select">{`Uploading on page `}</InputLabel>
        <Select
          labelId="pageId-select"
          id="demo-simple-select"
          defaultValue={1}
          label="Selected page"
          value={pageId}
          onChange={(e) => setPageId(e.target.value as number)}
        >
          {optionValues.map((value, index) =>
            <MenuItem key={index} value={value}>{value + 1}</MenuItem>
          )
          }

        </Select>
      </FormControl>}
    </div>
  )
}

export default UploadButtons
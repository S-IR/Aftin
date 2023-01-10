import React, { useEffect, useRef, useState } from 'react'
import { object } from 'yup'
import { UploadImgInputs } from '../../UploadImageComp'

interface props {
  getValues: UseFormGetValues<UploadImgInputs>
  imgFieldObj: object
  register: UseFormRegister<UploadImgInputs>
  errors: FieldErrorsImpl<UploadImgInputs>
}
const SecondDegreeInput = ({ getValues, imgFieldObj, register, errors }: props) => {
  const inputName = Object.keys(imgFieldObj)
  const optionsArr = Object.values(imgFieldObj)[0]
  const selectRef = useRef<React.LegacyRef<null | HTMLSelectElement>>(null)
  const [firstOptionState, setFirstOptionState] = useState<null | string>(null)





  return (
    <>
      <label className='inline-block w-full'>
        <p>{inputName}</p>
        <select ref={selectRef} onChange={(e) => setFirstOptionState(e.target.value)} className='bg-black'>
          {/* you choose the type of thing that you want to add ( this is called the first degree). if it's values are another object then another componet will be displayed (the second degree) for you to choose the option that you would like */}
          {optionsArr.map((option: object | string) => {
            if (typeof (option) !== 'string') return
            return <option key={option} value={option}>{option}</option>
          }
          )}
        </select>
      </label>

      {imgFieldObj.map((fieldObj) => {
        if(Object.keys(fieldObj)[0] === firstOptionState){
          
        }
      })}
    </>
  )
}

export default SecondDegreeInput
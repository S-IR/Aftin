import React from 'react'
import { CSSFilter, imageFilterProperties } from '../../../constants/image-editor/imageFilters'
import { filtersActions } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { useAppDispatch } from '../../../Redux/hooks'
import styles from '../../../styles/image-editor/filters-button.module.css'


interface props{
  pageId: number
  elementId :number
  option:CSSFilter
  label: string
}

const Filter = ({pageId, elementId, option, label }:props) => {
  const dispatch = useAppDispatch();

  
  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filtersActions.CHANGE_IMAGE_FILTER({
      pageId,
      elementId,
      property : option.property,
      value :  parseFloat(e.target.value) 
    }))
  }
  
  return (
    <div  className={`${styles.toolbarItems}`}>
      <label className="block font-bold text-lg  text-gray-900 font-serif " htmlFor={option.property}>{label}</label>
      <input 
      className={`${styles.toolInput}`} 
      type="range" 
      id={option.property} 
      value={option.value} 
      min={option.range.min} 
      max={option.range.max} 
      onChange={handleSliderChange} ></input>
    </div>
  )
}

export default Filter
import React from 'react'
import { filter, filterProperties } from '../../constants/image-editor/imageFilters'
import { changeFilter, CHANGE_IMAGE_FILTER, filtersActions, filtersCount } from '../../features/canvas-elements/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import styles from '../../styles/image-editor/filters-button.module.css'
interface props{
  option:filterProperties
  label: string
}

const Filter = ({ option, label, id }:props) => {
  const dispatch = useAppDispatch();
  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filtersActions.CHANGE_IMAGE_FILTER({
      id: id,
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
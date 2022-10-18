import React from 'react'
import { filter } from '../../constants/image-editor/filters'
import { changeFilter, filtersCount } from '../../features/image-editor/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import styles from '../../styles/image-editor/filters-button.module.css'
interface props{
  option:filter
}

const Filter = ({ option }:props) => {
  
  const dispatch = useAppDispatch();
  function handleSliderChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeFilter({
      property : option.property,
      value :  parseFloat(e.target.value) 
    }))
    
  }
  
  return (
    <div  className={`${styles.toolbarItems}`}>
      <label className="block font-bold text-lg font-serif text-purple-300 " htmlFor={option.property}>{option.name}</label>
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
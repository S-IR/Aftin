import React, { MouseEventHandler } from 'react'

interface props {
  text:string
  handleOnClick?:React.MouseEventHandler<HTMLButtonElement>
  type?: undefined | 'submit'
  className?: string
  onMouseEnter?: Function| undefined
  onMouseLeave?: Function| undefined
}

const Button = ({text, handleOnClick= undefined, type=undefined, className='', onMouseEnter=undefined, onMouseLeave= undefined}:props) => {
  return (
    <div className="relative group">
      <div className={`${className} absolute inset-0.5 bg-orange-600 rounded-lg md:w-28 md:h-10 w-20 h-8 blur-md opacity-75 group-hover:opacity-100  transition-all duration-200`} ></div>
      <button 
      type={undefined}
      onMouseEnter={onMouseEnter as MouseEventHandler}
      onMouseLeave={onMouseLeave as MouseEventHandler}
      className={`${className} relative general-buttons  group-hover:text-gray-200 hover:shadow-none group-hover:scale-105` } onClick={(e)=>handleOnClick(e)}>{text}</button>
    </div>
  )
}

export default Button
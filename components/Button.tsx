import React from 'react'

interface props {
  text:string
  handleOnClick?:React.MouseEventHandler<HTMLButtonElement>
  type?: undefined | 'submit'
  className?: string
}

const Button = ({text, handleOnClick, type=undefined, className=''}:props) => {
  return (
    <div className="relative">
      <div className={`${className} absolute inset-0.5 bg-orange-600 rounded-lg md:w-32 md:h-10 w-20 h-8 blur-md opacity-75 group-hover:opacity-100 transition-all duration-200`} ></div>
      <button 
      type={undefined}
      className={`${className} relative general-buttons  group-hover:text-gray-200 hover:shadow-none`} onClick={(e)=>handleOnClick(e)}>{text}</button>
    </div>
  )
}

export default Button
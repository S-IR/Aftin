import React from 'react'

interface props {
  text:string
  handleOnClick:React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({text, handleOnClick}:props) => {
  return (
    <div className="relative group">
      <div className="absolute inset-0.5 bg-pink-600 rounded-lg md:w-32 md:h-10 w-24 h-12   mt-[10px] blur-md opacity-75 group-hover:opacity-100 transition-all duration-200 " ></div>
      <button className='relative general-buttons !ml-0 group-hover:text-gray-200 hover:shadow-none' onClick={()=>handleOnClick()}>{text}</button>
    </div>
  )
}

export default Button
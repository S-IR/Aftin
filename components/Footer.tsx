import React from 'react'

const Footer = () => {
  let tm = '\u2122'
  return (
    <footer className='border-t-2 border-black mt-52'>
      <div className='flex text-center justify-center'>
        <p className='text-white text-sm'>Aftin{tm} 2022</p>
      </div>
    </footer>
  )
}

export default Footer
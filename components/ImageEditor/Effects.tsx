import React from 'react'

const Effects = () => {
  return (
    <>
        <div>
            <label htmlFor='brightness' >Brightness</label>
            <input className='toolbar-input' type="range" ref={Brightness} min="0" max="200"  ></input>
          </div>
          <div>
            <label htmlFor='brightness' >Saturation</label>
            <input className='toolbar-input' type="range" ref={Saturation} min="0" max="200"  ></input>
          </div>
          <div>
            <label htmlFor='brightness' >Blur</label>
            <input className='toolbar-input' type="range" ref={Blur} min="0" max="25"  ></input>
          </div>
          <div>
            <label htmlFor='brightness' >Inversion</label>
            <input className='toolbar-input' type="range" ref={Inversion} min="0" max="100"  ></input>
          </div>
    </>
  )
}

export default Effects
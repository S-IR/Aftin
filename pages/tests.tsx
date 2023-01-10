import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { buildRgb, ColorQuantization, rgbArrayToHex } from '../model/client-side/f302b492-a403-4ac8-9745-c4db741051c9/buildRGB'

const tests = () => {
  const canvasRef = useRef<React.MutableRefObject<HTMLCanvasElement | null>>(null)

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {    
    const url = URL.createObjectURL(e.target.files[0])
    const image = new Image()
    image.src = url
    image.onload = () => {
      if(!canvasRef.current ) return
      const width = image.width
      const height = image.height
      canvasRef.current.width = image.width
      canvasRef.current.height = image.height
      const ctx = canvasRef.current.getContext("2d")
      ctx.drawImage(image, 0, 0)
      const imageData = ctx.getImageData(0, 0, width, height);
      const rgbArray = buildRgb(imageData.data)
      const MainColors = ColorQuantization(rgbArray, 3);
      const hexArray = rgbArrayToHex(MainColors)
      console.log(hexArray)
    }
  }
    return (
      <>
        <input type={`file`} onChange={(e) => handleClick(e)} />
        <canvas ref={canvasRef}  ></canvas>
      </>
    )
  }

  export default tests
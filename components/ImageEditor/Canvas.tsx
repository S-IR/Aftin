import React, { LegacyRef, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { filtersCount } from '../../features/image-editor/filtersSlice'
import { canvasFilters } from '../../model/image-editor/Canvas'
import { useAppSelector } from '../../Redux/hooks'

interface props {
  images: Array<HTMLImageElement>
}
const Canvas = ({ images }: props) => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null)
  let contextRef = useRef<CanvasRenderingContext2D | null>(null)
  let downloadRef = useRef<LegacyRef<HTMLAnchorElement>| null>(null)

  const filters = useAppSelector(filtersCount)


  

  useEffect(() => {
    if (!canvasRef.current) return
    contextRef.current = canvasRef.current.getContext("2d")
    canvasRef.current.width = images[0].width
    canvasRef.current.height = images[0].height
    
   }, [])
  useEffect(() => {
    if(!contextRef.current) return
    console.log(filters)
    contextRef.current.filter = canvasFilters(filters)
    images.forEach((image:HTMLImageElement) => {
      contextRef.current?.drawImage(image, 0, 0);
    })
  }, [filters] )//fix THIS USE EFFECT AS IT WILL NOT WORK

  


  return (
    <section className=''>
      <div>
        <canvas
          ref={canvasRef}
          className='bg-black'
        >
        </canvas>
      </div>
      <div className='w-full h-[70px] bg-gradient-to-br from-blue-800 via-fuchsia-800 to-blue-800'>
        <a className='general-buttons'
          ref={downloadRef}
          // onClick={() => handleDownload(filters, canvasRef.current, downloadRef.current)}
          href={canvasRef.current?.toDataURL()}
          download=""
          >Download
        </a>
      </div>
    </section>
  )
}

export default Canvas
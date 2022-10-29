import React from 'react'
import { canvasElement, canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'
import { filtersCount } from '../../features/canvas-elements/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import ImageElementProperties from './Canvas/ImageElementProperties'
import ShapeElementProperties from './Canvas/ShapeElementProperties'
import TextElementProperties from './Canvas/TextElementProperties'

const StylizeButtons = () => {
  const dispatch = useAppDispatch()
  
  const filters = useAppSelector(filtersCount)

  const selected = useAppSelector(canvasElemsCount).present.selected
  
  
  //ignore the null type, if it is null then nothing will render anyway
  const selectedElement = useAppSelector(canvasElemsCount).present.elements[selected]
  
  const renderSwitch = (selectedElement: canvasElement) => {
    switch (selectedElement.elementType) {
      case 'image':
        const imageData = selectedElement.data
        return (
          <ImageElementProperties imageData={imageData} dispatch={dispatch} id={selected} imageFilter={filters[selected]}  />
        )
      case 'text':
        const textData = selectedElement.data
        return (
          <TextElementProperties textData={textData} dispatch={dispatch} id={selected} textFilter={filters[selected]} />
        )
      case 'shape':
        const shapeData = selectedElement.data
        return(
          <ShapeElementProperties shapeData={shapeData} dispatch={dispatch} shapeFilter={filters[selected]}/>
        )
      default:
        return (<></>)
    }
  }
  return (
    <div className='h-[100vh] w-96 bg-gradient-to-br from-red-900/80 via-black/80 to-red-900/80'>
      {selected !== null ? 
        renderSwitch(selectedElement) :
        <div className='flex w-full items-center p-4 mt-6 justify-center align-middle bg-fuchsia-900 rounded-md shadow-md shadow-blue-300'>
        Upload an image and this tab will show the properties of the element you are editing</div> 
      } 
    </div>
  )
}

export default StylizeButtons
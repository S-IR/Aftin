import React from 'react'
import { canvasElement, canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { filtersCount, imageFilter, shapeFilter, textFilter } from '../../../features/canvasPages/canvas-elements/filtersSlice'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'
import ImageElementProperties from '../Canvas/ImageElementProperties'
import ShapeElementProperties from '../Canvas/ShapeElementProperties'
import TextElementProperties from '../Canvas/TextElementProperties'


const StylizeButtons = () => {
  const dispatch = useAppDispatch()

  const filters = useAppSelector(filtersCount)

  //if the selected is null then the component will tell you to select an element
  const selected = useAppSelector(canvasPagesCount).present.selected;

  
  const pages = useAppSelector(canvasPagesCount).present.pages
  if (!selected) return <></>
  let selectedElement = null
  const hasElementSelected = selected.page !== null && selected.element !== null
  if (hasElementSelected) selectedElement = pages[selected.page as number][selected.element as number]


  const renderSwitch = (selectedElement: canvasElement) => {
    console.log(`selectedElement:`, selectedElement)

    if (!hasElementSelected) return <></>
    switch (selectedElement.elementType) {
      case 'image':
        const imageData = selectedElement.data
        return (
          <ImageElementProperties imageData={imageData} dispatch={dispatch} selected={selected} imageFilter={filters[selected.page as number][selected.element as number] as imageFilter} />
        )
      case 'text':
        const textData = selectedElement.data
        return (
          <TextElementProperties textData={textData} dispatch={dispatch} selected={selected} textFilter={filters[selected.page as number][selected.element as number] as textFilter} />
        )
      case 'shape':
        const shapeData = selectedElement.data
        return (
          <ShapeElementProperties shapeData={shapeData} dispatch={dispatch} selected={selected} shapeFilter={filters[selected.page as number][selected.element as number] as shapeFilter} />
        )
      default:
        return (<></>)
    }
  }

  return (
    <div className='h-[100vh] w-96 bg-white shadow-inner  shadow-black'>
      {selected !== null ?
        renderSwitch(selectedElement as canvasElement ) :
        <div className='flex w-full items-center p-4 mt-6 justify-center align-middle bg-fuchsia-900 rounded-md shadow-md shadow-blue-300'>
          Upload an image and this tab will show the properties of the element you are editing</div>
      }
    </div>
  )
}

export default StylizeButtons
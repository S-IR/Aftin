import { AspectRatio } from '@mui/icons-material'
import { MenuItem, Select } from '@mui/material'
import Popover from '@mui/material/Popover'
import Image from 'next/image'
import React, { useState } from 'react'
import { digitalLayouts, physicalLayouts } from '../../../constants/image-editor/layoutTypes'
import { canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice'
import { changeCanvasSize, handleAddPage, handleDeletePage } from '../../../model/client-side/image-editor/Canvas'
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks'

const LayoutButtons = () => {
  const dispatch = useAppDispatch()
  const { w, h, selected} = useAppSelector(canvasPagesCount).present

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  return (
    <section className='h-[90vh] w-72 bg-gradient-to-br bg-gray-200 text-white shadow-md shadow-gray-500 flex flex-col'>
      <div className=' w-full flex h-auto'>
        <button
          onClick={openPopover}
          id={'layout-size-popover'}
          className='w-72 h-16 flex bg-gray-500 hover:bg-gray-300 transition-all duration-300 justify-center hover:text-lg items-center drop-shadow-2xl shadow-gray-200'>
          <AspectRatio className=' h-8 w-auto' />
          Layout size
        </button>
        <Popover
          id={"select-filter-popover"}
          open={anchorEl?.id === 'layout-size-popover'}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          transitionDuration={500}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >

          <div className='flex w-auto h-auto space-x-4 p-2  flex-grow border-l-2 border-white  bg-black text-white' >
            <div className='flex flex-col flex-grow border-l-2 border-gray-300   items-center' >
              <p className='font-bold italic text-white font-serif text-xl my-2'>Physical layouts</p>
              {physicalLayouts.map((layout) => {
                const isSelected = layout.value.w === w && layout.value.h === h
                return (
                  <button className={`${isSelected ? `bg-gray-500` : `bg-none`}  flex flex-row w-[196px] ml-4 my-3 items-center align-middle shadow-sm shadow-gray-500 rounded-l-full hover:shadow-gray-200 transition-all duration-300`} key={layout.name}
                    onClick={() => changeCanvasSize(dispatch, layout.value.w, layout.value.h)}
                  >
                    <Image
                      src={layout.url}
                      width={48}
                      height={48}
                      objectFit={`cover`}
                      alt={`layout image`}
                      className={'rounded-full'}

                    />
                    <p className='text-gray-200 mx-2'>{layout.name}</p>
                  </button>
                )
              })}

            </div>

            <div className=' bg-black text-white shadow-lg shadow-gray-900 m-2 flex space-x-1'>
              <div className='flex flex-col flex-grow border-r-2 border-white items-center ' >
                <p className='font-bold italic text-white font-serif text-xl my-2'>Digital layouts</p>
                {digitalLayouts.map((layout) => {
                  const isSelected = layout.value.w === w && layout.value.h === h
                  return (
                    <button className={`${isSelected ? `bg-gray-500` : `bg-none`}  flex flex-row w-[196px] ml-4 my-3 items-center align-middle shadow-sm shadow-gray-500 rounded-l-full hover:shadow-gray-200 transition-all duration-300`} key={layout.name}
                      onClick={() => changeCanvasSize(dispatch, layout.value.w, layout.value.h)}
                    >
                      <Image
                        src={layout.url}
                        width={48}
                        height={48}
                        objectFit={`cover`}
                        alt={`layout image`}
                        className={'rounded-full'}

                      />
                      <p className='text-gray-200 mx-2'>{layout.name}</p>
                    </button>
                  )
                })}

              </div>
            </div>
          </div>

        </Popover>
      </div >
      {/* <div>
        <Select
          labelId="pageId-select"
          id="demo-simple-select"
          defaultValue={1}
          label="Age"
          value={pageId}
          onChange={(e) => setPageId(e.target.value as number)}
        >
          {optionValues.map((value, index) =>
            <MenuItem key={index} value={value}>{value + 1}</MenuItem>
          )
          }

        </Select>
      </div> */}

      {/* Edit buttons div */}

      <div className='w-full flex items-center justify-center align-middle flex-col space-y-6 mt-6'>
        <button className=' bg-gradient-to-b from-yellow-700 to-yellow-800 filter-none bg-opacity-70  h-12  flex align-middle hover:filter brightness-90 transition-all duration-300 w-56 justify-center  items-center drop-shadow-2xl shadow-gray-200'
          onClick={() => handleAddPage(dispatch)}
        >
          Add Page
        </button>
        {selected !== null && selected !== undefined && <button className='bg-gradient-to-b from-yellow-700 to-yellow-800 filter-none bg-opacity-70  h-12  flex align-middle hover:filter brightness-90 transition-all duration-300 w-56 justify-center  items-center drop-shadow-2xl shadow-gray-200 '
          onClick={() => { handleDeletePage(dispatch, selected.page) }}
        >
          Delete Page
        </button>}

        <button className=' bg-gradient-to-b from-yellow-700 to-yellow-800 filter-none bg-opacity-70  h-12  flex align-middle hover:filter brightness-90 transition-all duration-300 w-56 justify-center  items-center drop-shadow-2xl shadow-gray-200'  >
          Default Background
        </button>
      </div>
      {/* Crop button */}


    </section >
  )
}

export default LayoutButtons
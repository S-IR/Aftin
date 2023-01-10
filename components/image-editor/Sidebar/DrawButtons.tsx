import React, { useEffect, useState } from 'react'
import { Alert, Popover } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { uploadShapeToCanvas } from '../../../model/client-side/image-editor/Upload';
import { BiShapeCircle } from 'react-icons/bi';
import { FilterFrames, ShapeLine, ShareOutlined } from '@mui/icons-material';
import { FaIcons } from 'react-icons/fa';
import { canvasPagesCount } from '../../../features/canvasPages/canvas-elements/canvasPageSlice';
import { activeSidebarType } from './SidebarIcon';

interface props {
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>
}
const





  DrawButtons = ({ setActiveSidebar }: props) => {
    const isTheCanvasEmpty = useAppSelector(canvasPagesCount).present.pages[0].length === 0

    const pageId = useAppSelector(canvasPagesCount).present.selected.page

    const [alert, setAlert] = useState<null | string>(null)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const showPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
      return setAnchorEl(event.currentTarget);
    };
    const closePopover = () => {
      return setAnchorEl(null);
    };
    
    const shapeOpen = anchorEl?.id === 'show shapes button';
    const stickersOpen = anchorEl?.id === 'show stickers button'
    const edgesOpen = anchorEl?.id === `show edges button`

    const shapeID = shapeOpen ? 'shapePopover' : undefined;
    const stickerID = stickersOpen ? 'stickerPopover' : undefined;
    const edgesID = edgesOpen? `edgesPopover`: undefined;



    const dispatch = useAppDispatch()
    useEffect(() => {
      setAlert(null)
    }, [useAppSelector(canvasPagesCount).present.pages.length])


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      if (isTheCanvasEmpty || pageId === null) return setAlert('Add an image to the canvas before adding a shape')
      setAlert(null)
      switch (e.target.id) {
        case 'circle-button':
          uploadShapeToCanvas(dispatch, pageId, { shape: 'Circle' })
          setActiveSidebar('Stylize')
          break
        case 'square-button':
          uploadShapeToCanvas(dispatch, pageId, { shape: 'Rect' })
          setActiveSidebar('Stylize')
          break
        case 'rectangle-button':
          console.log('we are  here');
          uploadShapeToCanvas(dispatch, pageId, { shape: 'Rect', width: 150, height: 75 })
          setActiveSidebar('Stylize')
          break
        case 'ring-button':
          uploadShapeToCanvas(dispatch, pageId, { shape: 'Ring', strokeWidth: 10, innerRadius: 50, outerRadius: 50 })
          setActiveSidebar('Stylize')
          break
      }
    }


    return (
      <section className='flex flex-col items-center bg-gradient-to-br bg-gray-400 h-full w-64 py-10 space-y-16'>
        
        <button className='flex align-middle justify-center items-center  w-44 space-x-4 h-14 rounded-sm bg-gray-900 shadow-lg font-serif  shadow-gray-600 hover:translate-x-1 transition-all duration-300 ease-in-out active:shadow-none active:scale-100 border-t-4 border-orange-500 ' id={`show shapes button`} onClick={showPopover}>
          <ShapeLine className='w-8 h-8 mr-4' color='warning' />
          Insert shape
        </button>
        <button className='flex align-middle justify-center items-center  w-44 space-x-4 h-14 rounded-sm bg-gray-900 shadow-lg font-serif  shadow-gray-600 hover:translate-x-1 transition-all duration-300 ease-in-out active:shadow-none active:scale-100 border-t-4 border-orange-500  ' id={`show shapes button`} onClick={showPopover}>
          <FaIcons className='w-8 h-8 mr-4' color='brown' />
          Insert sticker
        </button>

        <button className='flex align-middle justify-center items-center  w-44 space-x-4 h-14 rounded-sm bg-gray-900 shadow-lg font-serif  shadow-gray-600 hover:translate-x-1 transition-all duration-300 ease-in-out active:shadow-none active:scale-100 border-t-4 border-orange-500 text-sm ' id={`show edges button`} onClick={showPopover}>
          <FilterFrames className='w-8 h-8 mr-4 ml-4' htmlColor='#f97316' />
          Insert Frames & Edges
        </button>
        {/* shapes popup */}
        <Popover
          id={shapeID}
          open={shapeOpen}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div className='flex w-40 py-4 space-y-3 flex-col col-span-2 items-center justify-center align-middle bg-gray-100 '>
            <button id='circle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white font-bold !rounded-full shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a circle
            </button>
            <button id='square-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white font-bold rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a square
            </button>
            <button id='rectangle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-32 !h-16  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add rectangle
            </button>
            <button id='ring-button' onClick={(e) => handleClick(e)} className="bg-none border-4 border-gray-900 !w-24 !h-24 rounded-full  hover:bg-border-gray-700 text-black  shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a ring
            </button>
            {alert !== null ? <Alert severity='error'>{alert}</Alert> : <></>}
          </div>
        </Popover>
        {/* stickers popup */}
        <Popover
          id={stickerID}
          open={stickersOpen}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className='flex w-40 py-4 space-y-3 flex-col col-span-2 items-center justify-center align-middle bg-gray-100 '>
            <button id='circle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white !rounded-full shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a circle
            </button>
            <button id='square-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a square
            </button>
            <button id='rectangle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-32 !h-16  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add rectangle
            </button>
            <button id='ring-button' onClick={(e) => handleClick(e)} className="bg-none border-4 border-gray-900 !w-24 !h-24 rounded-full  hover:bg-border-gray-700 text-black  shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a ring
            </button>
            {alert !== null ? <Alert severity='error'>{alert}</Alert> : <></>}
          </div>
        </Popover>

        {/* edges & frames  */}

        <Popover
          id={edgesID}
          open={edgesOpen}
          anchorEl={anchorEl}
          onClose={closePopover}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <div className='flex w-40 py-4 space-y-3 flex-col col-span-2 items-center justify-center align-middle bg-gray-100 '>
            <button id='circle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white !rounded-full shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a circle
            </button>
            <button id='square-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-20 !h-20  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a square
            </button>
            <button id='rectangle-button' onClick={(e) => handleClick(e)} className="bg-gray-900 !w-32 !h-16  hover:bg-gray-700 text-white rounded-sm shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add rectangle
            </button>
            <button id='ring-button' onClick={(e) => handleClick(e)} className="bg-none border-4 border-gray-900 !w-24 !h-24 rounded-full  hover:bg-border-gray-700 text-black  shadow-lg !shadow-gray-700 !hover:shadow-red-500 transition-all duration-300 !text-md ">Add a ring
            </button>
            {alert !== null ? <Alert severity='error'>{alert}</Alert> : <></>}
          </div>
        </Popover>

      </section>
    )
  }

export default DrawButtons
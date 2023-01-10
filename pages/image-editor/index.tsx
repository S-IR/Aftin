import Head from 'next/head'
import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { FaAngleDoubleLeft, FaIcons } from 'react-icons/fa'
import { BiText, BiPalette } from 'react-icons/bi'
import { MdOutlineDoubleArrow, MdOutlineDraw } from 'react-icons/md'
import { CSSTransitionComp, DrawButtons, ImagesButtons, ShowLess, ShowMore, TextButtons, UploadButtons } from '../../components/image-editor/Sidebar'
import dynamic from 'next/dynamic'
import { useAppSelector } from '../../Redux/hooks'
import { SidebarIcon, StylizeButtons } from '../../components/image-editor/Sidebar'

import { CSSTransition, TransitionGroup } from "react-transition-group"
import { NextPage } from 'next'
import { Layers, Panorama } from '@mui/icons-material'
import { DropzoneComp } from '../../components/image-editor'
import { useSpring, animated, config } from 'react-spring'

import LayoutButtons from '../../components/image-editor/Sidebar/LayoutButtons'
import { canvasElement, canvasPagesCount } from '../../features/canvasPages/canvas-elements/canvasPageSlice'
import { Tooltip } from '@mui/material'
const Canvas = dynamic(
  () => import('../../components/image-editor/Canvas'),
  { ssr: false }
);
// import Canvas from '../../components/image-editor/Canvas'

type activeSidebarType = 'Upload' | 'Layout' | 'Images' | 'Text' | 'Stylize' | 'Filters' | 'Draw'


const Index: NextPage = () => {

  //canvas  related code
  const firstImage = useAppSelector(canvasPagesCount).present.pages[0].find((element: canvasElement) => element.elementType === 'image')


  const canvasPages = useAppSelector(canvasPagesCount)

  //sidebar buttons code
  const [activeSidebar, setActiveSidebar] = useState<activeSidebarType>('Upload');
  const [showMore, setShowMore] = useState(false)
  const [showSidebar, toggleSidebar] = useState(true)




  return (
    <>
      <Head>
        <title>Food Image Editor</title>
      </Head>
      <div className='flex w-full '>
        <div className='fixed flex'>
          {showSidebar ?
            <button className=' z-10 w-auto absolute top-3 -right-4 rounded-full bg-gray-500 p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out ' onClick={() => toggleSidebar((v) => (!v))}>
              <FaAngleDoubleLeft direction={'right'} color={'black'} className={'w-6 h-6'} />
            </button> :
            <Tooltip title='Toggle sidebar' >
              <button className={` ${showSidebar ? ` opacity-0` : ` opacity-1`} z-10 w-auto absolute top-3 -right-4 rounded-full bg-gray-500/60 p-2 hover:bg-gray-300 transition-all duration-300 ease-in-out `} onClick={() => toggleSidebar((v) => (!v))}>
                <MdOutlineDoubleArrow className='h-16 w-16 md:w-8 md:h-8 ' />
              </button>
            </Tooltip>
          }
          <animated.section className={`h-[90vh] bg-gradient-to-br bg-gray-900  w-[7vw] items-center flex flex-col  `}>
            <SidebarIcon Icon={<AiOutlineCloudUpload className='w-[5vw] h-[5vh]' />} 
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text='Upload'
               />
            <SidebarIcon Icon={<Panorama className='w-[5vw] h-[5vh]' />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text='Images'
               />
            <SidebarIcon Icon={<Layers className='w-[5vw] h-[5vh]' />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text='Layout'
               />
            <SidebarIcon Icon={<BiText className='w-[5vw] h-[5vh]' />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text='Text'
               />

            <SidebarIcon Icon={<BiPalette className='w-[5vw] h-[5vh]' />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text='Stylize'
               />



            <SidebarIcon Icon={<MdOutlineDraw className='w-[5vw] h-[5vh]' />}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              Text='Draw'
               />


          </animated.section>
          <TransitionGroup>
            <animated.div className={`h-[90vh] ${showSidebar ? `left-0 opacity-1 w-auto ` : `-left-52 opacity-0 w-[0px]`}  `}>
              {activeSidebar === 'Upload' ?
                <CSSTransitionComp
                  activeSidebar={activeSidebar}
                  sidebarName={'Upload'}
                  sidebarButtons={
                    <UploadButtons
                      setActiveSidebar={setActiveSidebar}
                    />
                  }
                  showSidebar={showSidebar} />
                : ''}
              {activeSidebar === 'Images' ?
                <CSSTransitionComp
                  activeSidebar={activeSidebar}
                  sidebarName={'Images'}
                  sidebarButtons={
                    <ImagesButtons />
                  }
                  showSidebar={showSidebar} /> : ''}
              {activeSidebar === 'Layout' ?
                <CSSTransitionComp
                  activeSidebar={activeSidebar}
                  sidebarName={'Layout'}

                  sidebarButtons={
                    <LayoutButtons />
                  }
                  showSidebar={showSidebar} /> : ''}
              {activeSidebar === 'Text' ?
                <CSSTransitionComp
                  activeSidebar={activeSidebar}
                  sidebarName={'Text'}
                  sidebarButtons={
                    <TextButtons
                      setActiveSidebar={setActiveSidebar}
                    />
                  }
                  showSidebar={showSidebar} /> : ''}
              {activeSidebar === 'Stylize' ?
                <CSSTransitionComp
                  activeSidebar={activeSidebar}
                  sidebarName={'Stylize'}
                  sidebarButtons={
                    <StylizeButtons />
                  }
                  showSidebar={showSidebar} /> : ''}

              {activeSidebar === 'Draw' ?
                <CSSTransitionComp
                  activeSidebar={activeSidebar}
                  sidebarName={'Draw'}
                  sidebarButtons={
                    <DrawButtons
                      setActiveSidebar={setActiveSidebar}
                    />
                  }
                  showSidebar={showSidebar} /> : ''}

            </animated.div>
          </TransitionGroup>
        </div>

          {
            firstImage && canvasPages.past.length > 0 ? <Canvas
            showSidebar={showSidebar}
            /> : <DropzoneComp
            showSidebar={showSidebar}
              setActiveSidebar={setActiveSidebar}
            />
          }

      </div >

    </>
  )
}

export default Index
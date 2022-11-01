import Head from 'next/head'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { FaIcons } from 'react-icons/fa'
import { BiText, BiPalette } from 'react-icons/bi'
import { MdFormatShapes, MdOutlineDraw } from 'react-icons/md'
import { SidebarIcon, UploadButtons, StickersButtons, DrawButtons, FiltersButtons, DropzoneComp, ShowMore, TextButtons } from '../../components/ImageEditor/index'

import { filter } from '../../constants/image-editor/imageFilters'
import { ShowLess } from '../../components/ImageEditor/Sidebar'
import dynamic from 'next/dynamic'
import { useAppSelector } from '../../Redux/hooks'
import { canvasElement, canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'
import { StylizeButtons } from '../../components/ImageEditor'

import { CSSTransition, TransitionGroup } from "react-transition-group"
import CSSTransitionComp from '../../components/ImageEditor/CSSTransitionComp'
const Canvas = dynamic(
  () => import('../../components/ImageEditor/Canvas'),
  { ssr: false }
);
// import Canvas from '../../components/ImageEditor/Canvas'

interface activeSidebarType {
  activeSidebar:
  | 'upload'
  | 'Stickers'
  | 'Text'
  | 'Stylize'
  | 'Filters'
  | 'Draw'
}

const Index = () => {

  //canvas  related code
  const firstImage =  useAppSelector(canvasElemsCount).present.elements.find((element: canvasElement) => element.elementType === 'image')
  
  
  const canvasElems = useAppSelector(canvasElemsCount)
  type options = Array<filter>;

  //sidebar buttons code
  const [activeSidebar, setActiveSidebar] = useState('Upload');
  const [showMore, setShowMore] = useState(false)


  type activeSidebar = activeSidebarType;

  return (
    <>
      <Head>
        <title>Food Image Editor</title>
      </Head>
      <div className='flex w-full '>
        <section className='h-[100vh] bg-gradient-to-br from-[#4952bd] via-purple-900 to-[#4952bd]  w-[75px] items-center flex flex-col'>
          <SidebarIcon Icon={<AiOutlineCloudUpload className='w-[32px] h-[32px]' />} setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Upload'
            showMore={showMore} />
          <SidebarIcon Icon={<FaIcons className='w-[32px] h-[32px]' />}
            setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Stickers'
            showMore={showMore} />
          <SidebarIcon Icon={<BiText className='w-[32px] h-[32px]' />}
            setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Text'
            showMore={showMore} />

          <SidebarIcon Icon={<BiPalette className='w-[32px] h-[32px]' />}
            setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Stylize'
            showMore={showMore} />

          <ShowMore
            showMore={showMore}
            setShowMore={setShowMore}
          />

          <SidebarIcon Icon={<MdOutlineDraw className='w-[32px] h-[32px]' />}
            setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Draw'
            showMore={showMore} />

          <ShowLess
            showMore={showMore}
            setShowMore={setShowMore}
          />
        </section>
        <TransitionGroup>
          <div className={`h-[100vh]  `}>
            {activeSidebar === 'Upload' ?
              <CSSTransitionComp
              activeSidebar={activeSidebar}
              sidebarButtons={
                <UploadButtons
                  setActiveSidebar={setActiveSidebar}
                />
              } />
              : ''}
            {activeSidebar === 'Stickers' ?
              <CSSTransitionComp
              activeSidebar={activeSidebar}
              
              sidebarButtons={
                <StickersButtons />
              } /> : ''}
            {activeSidebar === 'Text' ?
              <CSSTransitionComp
              activeSidebar={activeSidebar}
               sidebarButtons={
                <TextButtons
                  setActiveSidebar={setActiveSidebar}
                />
              } /> : ''}
            {activeSidebar === 'Stylize' ?
              <CSSTransitionComp
              activeSidebar={activeSidebar}
               sidebarButtons={
                <StylizeButtons />
              } /> : ''}

            {activeSidebar === 'Filters' ?
              <CSSTransitionComp
              activeSidebar={activeSidebar}
               sidebarButtons={
                <FiltersButtons />
              } /> : ''}
            {activeSidebar === 'Draw' ?
              <CSSTransitionComp
              activeSidebar={activeSidebar}
               sidebarButtons={
                <DrawButtons
                setActiveSidebar={setActiveSidebar}
              />
              } /> : ''}

          </div>
        </TransitionGroup>

        {
          firstImage && canvasElems.past.length > 0 ? <Canvas /> : <DropzoneComp
            firstImage={firstImage}
            setActiveSidebar={setActiveSidebar}
          />
        }
      </div >

    </>
  )
}

export default Index
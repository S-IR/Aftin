import Head from 'next/head'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { FaIcons } from 'react-icons/fa'
import { BiText, BiCrop } from 'react-icons/bi'
import { IoColorFilterSharp } from 'react-icons/io5'
MdOutlineDraw
import { MdOutlineDraw } from 'react-icons/md'
import { SidebarIcon, UploadButtons, StickersButtons, TextButtons, CropButtons, DrawButtons, FiltersButtons, DropzoneComp, ShowMore } from '../../components/ImageEditor/index'

import { filter } from '../../constants/image-editor/filters'
import { ShowLess } from '../../components/ImageEditor/Sidebar'
import dynamic from 'next/dynamic'
import { useAppSelector } from '../../Redux/hooks'
import { canvasElemsCount } from '../../features/canvas-elements/canvasElemSlice'

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
  | 'Crop'
  | 'Filters'
  | 'Draw'
}

const Index = () => {

  //canvas  related code
  const [firstImage, setFirstImage] = useState(false);
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
      <Navbar />
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

          <ShowMore
            showMore={showMore}
            setShowMore={setShowMore}
          />

          <SidebarIcon Icon={<BiCrop className='w-[32px] h-[32px]' />}
            setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Crop'
            showMore={showMore} />
          <SidebarIcon Icon={<IoColorFilterSharp className='w-[32px] h-[32px]' />}
            setActiveSidebar={setActiveSidebar}
            activeSidebar={activeSidebar}
            Text='Filters'
            showMore={showMore} />
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
        <div className={`h-[100vh] min-w-[300px] bg-gray-800 `}>
          {activeSidebar === 'Upload' ? <UploadButtons
            firstImage={firstImage}
            setFirstImage={setFirstImage}
          /> : ''}
          {activeSidebar === 'Stickers' ? <StickersButtons /> : ''}
          {activeSidebar === 'Text' ? <TextButtons
            firstImage={firstImage}
          /> : ''}
          {activeSidebar === 'Crop' ? <CropButtons /> : ''}
          {activeSidebar === 'Filters' ? <FiltersButtons
          /> : ''}
          {activeSidebar === 'Draw' ? <DrawButtons
          firstImage={firstImage}
          /> : ''}
        </div>
        {firstImage && canvasElems.past.length > 0 ? <Canvas /> : <DropzoneComp
          firstImage={firstImage}
          setFirstImage={setFirstImage}
        />}
      </div>

    </>
  )
}

export default Index
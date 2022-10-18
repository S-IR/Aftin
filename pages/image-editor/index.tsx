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

import Canvas from '../../components/ImageEditor/Canvas'
import { filter } from '../../constants/image-editor/filters'
import { ShowLess } from '../../components/ImageEditor/Sidebar'

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

  //canvas and image related code
  const [images, setImages] = useState<Array<HTMLImageElement>>([]);
  const [firstImage, setFirstImage] = useState(false);

  type options = Array<filter>;
  //sidebar buttons code
  const [activeSidebar, setActiveSidebar] = useState('Upload');
  const [showMore, setShowMore] = useState(false)

  console.log(showMore)
  
  type activeSidebar = activeSidebarType;

  return (
    <>
      <Head>
        <title>Food Image Editor</title>
      </Head>
      <Navbar />
      <div className='flex w-full '>
        <div className='min-h-[90vh] max-h-[90vh] bg-gradient-to-br from-[#4952bd] via-purple-900 to-[#4952bd] pt-4 w-[75px] items-center flex flex-col'>
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
        </div>
        <div className={`min-h-[90vh] min-w-[300px] bg-gray-800`}>
          {activeSidebar === 'Upload' ? <UploadButtons
            firstImage={firstImage}
            setFirstImage={setFirstImage}
            setImages={setImages}
          /> : ''}
          {activeSidebar === 'Stickers' ? <StickersButtons /> : ''}
          {activeSidebar === 'Text' ? <TextButtons /> : ''}
          {activeSidebar === 'Crop' ? <CropButtons /> : ''}
          {activeSidebar === 'Filters' ? <FiltersButtons
          /> : ''}
          {activeSidebar === 'Draw' ? <DrawButtons /> : ''}
        </div>
        {firstImage ? <Canvas images={images} /> : <DropzoneComp
          firstImage={firstImage}
          setFirstImage={setFirstImage}
          setImages={setImages}
        />}

      </div>

    </>
  )
}

export default Index
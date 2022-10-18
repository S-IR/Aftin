import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { PhotographIcon, CakeIcon, PencilIcon, DeviceMobileIcon, VariableIcon } from '@heroicons/react/solid'
import styles from '../../styles/Home.module.css'

function CreateWithUs() {

  const { ref: PhotoSection, inView: PhotoSectionVisible } = useInView({triggerOnce:true});
  const { ref: ArtisticSection, inView: ArtisticSectionVisible } = useInView({triggerOnce:true});
  const { ref: EditingSection, inView: EditingSectionVisible } = useInView({triggerOnce:true});
  const { ref: HiringSection, inView: HiringSectionVisible } = useInView({triggerOnce:true});
  const { ref: AISection, inView: AISectionVisible } = useInView({triggerOnce:true});








  let pathLength = 2700
  return (
    <section className='my-36 relative'>
      <div className=' flex text-center justify-center'>
        <p className='inline border-2 border-white text-2xl ml-10 md:text-5xl font-serif text-gray-300 font-bold '>
          We can help you stand out against the other <br></br>
          622 000 US restaurants
        </p>
      </div>
      <div className='text-center overflow-hidden'>

        <svg width="1920" height="2700" viewBox="0 0 1920 2700" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_1_2)">
            <path d="M381 10V523.104H1167V1022.71H381V1444.29H1167V1976.4L381 1959.9V2473" stroke="url(#paint0_linear_1_2)" strokeWidth="12" />
          </g>
          <defs>
            <filter id="filter0_d_1_2" x="-4" y="0" width="1928" height="2708" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_2" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_2" result="shape" />
            </filter>
            <linearGradient id="paint0_linear_1_2" x1="774" y1="10" x2="774" y2="2473" gradientUnits="userSpaceOnUse">
              <stop />
              <stop offset="0.322917" stopColor="#670EDA" stopOpacity="0.776042" />
              <stop offset="0.739583" stopColor="#09B1F9" stopOpacity="0.734375" />
              <stop offset="1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Photo section */}
        <div>
          <div ref={PhotoSection} className={`${styles.CreateWithUsNOTVisible}  absolute top-[17.5rem] left-[6.5rem] ${PhotoSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
            <PhotographIcon className='w-48 h-48' />
          </div>
          <div className={`absolute top-[30.5rem] md:top-[19.5rem]   md:left-[36.5rem] ${styles.CreateWithUsNOTVisible} ${PhotoSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
            <p className={styles.CreateWithUsText}>
              Access our full library of stock photos<br></br>
              to display high resolution images that fit your needs. </p>
          </div>
        </div>

        {/* Artistic image section */}
        <div ref={ArtisticSection} className={`${styles.CreateWithUsNOTVisible}  absolute top-[42.5rem]  md:top-[50.5rem] right-[9rem] md:right-[4.5rem] ${ArtisticSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <CakeIcon className='w-48 h-48' />
        </div>
        <div className={`absolute top-[56.5rem] md:top-[52.5rem]  md:left-[16.5rem] ${styles.CreateWithUsNOTVisible} ${ArtisticSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <p className={styles.CreateWithUsText}>
            Catch the eyes of your customers with our <br></br>
            artistically made banners, menus and general artworks.
          </p>
        </div>


        {/* Editing section */}
        <div ref={EditingSection} className={`${styles.CreateWithUsNOTVisible}  absolute top-[74.5rem] left-[6.5rem] ${EditingSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <PencilIcon className='w-48 h-48' />
        </div>
        <div className={`absolute top-[88.5rem] md:top-[76.5rem] right-[4.5rem] ${styles.CreateWithUsNOTVisible} ${EditingSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <p className={styles.CreateWithUsText}>
            Utilize our built-in image editor to <br></br>
            enhance and perfect your images effortlessly. <br></br>
            Crop, write, change the lighting and the hue at a moment's notice
          </p>
        </div>


        {/* Hire someone section */}
        <div ref={HiringSection} className={`${styles.CreateWithUsNOTVisible}  absolute top-[105.5rem] right-[4.5rem] ${HiringSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <DeviceMobileIcon className='w-48 h-48' />
        </div>
        <div className={`absolute top-[107.5rem] left-[16.5rem] ${styles.CreateWithUsNOTVisible} ${HiringSectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <p className={styles.CreateWithUsText}>
            Preview your images in your desired environment using our <br></br>
            Smartmockup system to ensure that you are getting what you need
          </p>
        </div>



        {/* AI section */}
        <div ref={AISection} className={`${styles.CreateWithUsNOTVisible}  absolute top-[140.5rem] left-[6.5rem] ${AISectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <VariableIcon className='w-48 h-48' />
        </div>
        <div className={`absolute top-[142.5rem] right-[16.5rem] ${styles.CreateWithUsNOTVisible} ${AISectionVisible ? `${styles.CreateWithUsVisible}` : ''}`}>
          <p className={styles.CreateWithUsText}>
            Produce, scale and quality check images using our AI-built API's.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CreateWithUs
//This component is meant to let the user choose what kind of restaurant he is and which kind of branding he does have. The info is stored in a cookie and then when requesting images

import { Fade, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import { MdImageSearch, MdOutlinePageview, MdPageview } from 'react-icons/md'
import { useSpring, animated, to, config } from 'react-spring'
import Button from '../Button'

const BrandTailorModal = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const styles = useSpring({
    from: { opacity: 0, transform: 'rotateY(-30deg' },
    to: { opacity: 1, transform: 'rotateY(0deg' },
    config: config.slow,
    delay: 1000,
  })
  const iconStyles = useSpring({
    from: { transform: `scale(1)` },
    to: { transform: `scale(1.2)` },
    loop: {
      reverse: true,
    },
    delay: 1500
  })
  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 124,
    p: 4,
  }



  return (
    <>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} >
          <Box sx={boxStyle} >
            <section className={`max-w-full max-h-full w-auto h-auto p-2 md:p-10  rounded-lg flex flex-col text-center
             bg-[url('/frontend-used-images/BrandTailorSVGBackground.svg')]`}>
              {/* The svg background. */}
              <h2 className='text-black bold text-lg md:text-4xl font-serif'>Filter options based on your branding style</h2>
              <div className='grid grid-cols-4'>
                
              </div>
              <div>
                <h3 className='text-lg'>Firstly what kind of restaurant are you designing for?</h3>
              </div>
            </section>
          </Box>
        </Fade>
      </Modal>

      <animated.button className=' group hover:shadow-lg transition-shadow duration-200 font-bold w-16  md:w-32  md:h-36 z-[2] flex flex-col items-center text-center  bg-red-900/40 shadow-inner  shadow-black' style={styles} onClick={handleOpen}>
        <animated.div style={iconStyles}>
          <MdImageSearch className='w-12 h-12 md:w-16 md:h-16' />
        </animated.div>
        <p className='text-sm md:text-md text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-white to-gray-500'>Find your desired image faster</p>
      </animated.button>
    </>

  )
}

export default BrandTailorModal
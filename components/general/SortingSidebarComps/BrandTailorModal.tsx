//This component is meant to let the user choose what kind of restaurant he is and which kind of branding he does have. The info is stored in a cookie and then when requesting images

import { Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/legacy/image";
import React from "react";
import { MdImageSearch, MdOutlinePageview, MdPageview } from "react-icons/md";
import { useSpring, animated, to, config } from "react-spring";
import Button from "../Button";

const BrandTailorModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const styles = useSpring({
    from: { opacity: 0, transform: "rotateY(-30deg" },
    to: { opacity: 1, transform: "rotateY(0deg" },
    config: config.slow,
    delay: 1000,
  });
  const iconStyles = useSpring({
    from: { transform: `scale(1)` },
    to: { transform: `scale(1.2)` },
    loop: {
      reverse: true,
    },
    delay: 1500,
  });
  const boxStyle = {
    position: "absolute" as "absolute",
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    boxShadow: 124,
    p: 4,
  };

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
        <Fade in={open}>
          <Box sx={boxStyle}>
            <section
              className={`flex h-auto max-h-full w-auto max-w-full flex-col  rounded-lg bg-[url('//BrandTailorSVGBackground.svg')] p-2 text-center
             md:p-10`}
            >
              {/* The svg background. */}
              <h2 className="bold font-serif text-lg text-black md:text-4xl">
                Filter options based on your branding style
              </h2>
              <div className="grid grid-cols-4"></div>
              <div>
                <h3 className="text-lg">
                  Firstly what kind of restaurant are you designing for?
                </h3>
              </div>
            </section>
          </Box>
        </Fade>
      </Modal>

      <animated.button
        className=" group z-[2] flex w-16 flex-col items-center  bg-red-900/40  text-center font-bold shadow-inner shadow-black transition-shadow duration-200  hover:shadow-lg md:h-36  md:w-32"
        style={styles}
        onClick={handleOpen}
      >
        <animated.div style={iconStyles}>
          <MdImageSearch className="h-12 w-12 md:h-16 md:w-16" />
        </animated.div>
        <p className="md:text-md bg-gradient-to-br from-blue-400 via-white to-gray-500 bg-clip-text text-sm text-transparent">
          Find your desired image faster
        </p>
      </animated.button>
    </>
  );
};

export default BrandTailorModal;

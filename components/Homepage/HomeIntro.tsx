import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import homeIntroBanner from "../../public/frontend-used-images/homeIntroBanner.png";
import { useTrail, animated as a, useSpring } from "react-spring";

function HomeIntro() {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateY(${hTwoVisible ? 0 : 20}%)`,
  });

  const hThreeStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
  });

  return (
    <section className="h-[600px] flex-col justify-center space-y-8 bg-white/10 text-center text-2xl  ">
      <a.h2
        style={hTwoStyles}
        ref={hTwoRef}
        className={`translate-y-20 bg-gradient-to-br from-red-300 to-white bg-clip-text pt-10 font-Handwriting text-4xl text-transparent opacity-0 transition-all  duration-1000 ease-out md:text-8xl `}
      >
        Make<br></br> Your Restaurant <br></br> Stand Out
      </a.h2>
      <a.h3
        style={hThreeStyles}
        ref={hTwoRef}
        className={`translate-y-20 bg-gradient-to-br from-red-300 to-white bg-clip-text pt-10 font-Handwriting text-2xl text-transparent opacity-0  transition-all duration-1000 ease-out `}
      >
        By utilizing elegant, colorful and unique images and graphic design
        elements
      </a.h3>
    </section>
  );
}

export default HomeIntro;

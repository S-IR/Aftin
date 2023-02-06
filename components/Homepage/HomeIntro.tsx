import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import homeIntroBanner from "../../public/frontend-used-images/homeIntroBanner.png";

function HomeIntro() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <section className="h-[600px] flex-col justify-center space-y-8 bg-white/10 text-center text-2xl  ">
      <p
        className={`translate-y-20 bg-gradient-to-br from-red-300 to-white bg-clip-text pt-10 font-Handwriting text-8xl text-transparent opacity-0 ${
          inView ? `!translate-y-0 opacity-100` : ``
        } transition-all duration-1000 ease-out `}
        ref={ref}
      >
        Make<br></br> Your Restaurant <br></br> Stand Out
      </p>

      <p className="font-Handwriting text-2xl text-red-200">
        By utilizing elegant, colorful and unique images and graphic design
        elements
      </p>
    </section>
  );
}

export default HomeIntro;

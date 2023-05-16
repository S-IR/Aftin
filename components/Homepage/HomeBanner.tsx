import Image from "next/image";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import {
  useSpringRef,
  useTransition,
  animated,
  AnimatedProps,
} from "react-spring";
import styles from "../../styles/Home.module.css";
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from "react-intersection-observer";
import { isMobile } from "react-device-detect";

/**
 * Component at the top of homepage
 * @returns
 */
function HomeBanner() {
  const { ref: hOneRef, inView: hOneVisible } = useInView({
    triggerOnce: true,
  });

  const hOneStyles = useSpring({
    opacity: hOneVisible ? 1 : 0,
    transform: `translateY(${hOneVisible ? 0 : 20}%)`,
  });

  return (
    <section className="relative h-screen bg-gradient-to-b from-black via-black to-gray-800">
      {!isMobile && (
        <a.div
          className="absolute top-2 -right-20 max-h-screen overflow-hidden"
          style={hOneStyles}
        >
          <Image
            src={"/homepage/homeBannerImg.png"}
            alt={"home banner image for Aftin"}
            priority
            sizes={`768px`}
            width={768}
            height={768}
            quality={100}
            style={{ objectFit: "scale-down" }}
          />
        </a.div>
      )}
      <div className={`relative  max-w-full `}>
        <a.h1
          className={`absolute top-32 left-10
         z-50 flex  flex-col rounded  border-white/80 bg-gradient-to-br from-red-300 to-white
        bg-clip-text p-2 text-center font-Handwriting text-4xl  font-thin tracking-wider text-transparent  opacity-70   shadow-black  drop-shadow-lg lg:text-7xl ${styles.homeBannerHOne}  `}
          ref={hOneRef}
          style={hOneStyles}
        >
          <span className="p-2 text-8xl  md:text-6xl ">
            The graphic persuader
          </span>
          <span className=" text-3xl  md:text-6xl">of the</span>
          <span className=" text-3xl  md:text-8xl"> food industry</span>
        </a.h1>
      </div>
    </section>
  );
}

export default HomeBanner;

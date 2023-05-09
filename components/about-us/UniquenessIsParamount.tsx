import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const UniquenessIsParamount = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: true,
  });

  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateY(${hTwoRefVisible ? 0 : 20}%)`,
  });

  return (
    <article className="flex h-[75vh] w-full items-center justify-center border-y-2 border-dashed border-gray-400 align-middle">
      <p className="w-1/2 p-2 pl-4 text-center font-serif text-2xl">
        What makes you different from all other restaurants?<br></br>
        <br></br>
        We don’t try to give normal images to restaurants. We do have some just
        in case, but they’re there only for very specific cases. <br></br>
        <br></br>
        We try to give unique images that fit a particular brand. Old pub with a
        Victorian age feeling? Elegant restaurant with a fairyland aesthetic? A
        fast food with a cartoon feeling? No problem, we should be able to help
        you fulfill your need<br></br>
      </p>
      <div className="relative h-full w-1/2">
        <Image
          alt="Banner for the People Eat section for About Us - Aftin"
          src={"/about-us/UniquenessBanner.png"}
          fill
          style={{ objectFit: "cover" }}
          className="absolute top-0 left-0 -z-10 brightness-50 filter"
        />
        <animated.h2
          ref={hTwoRef}
          style={hTwoStyle}
          className=" flex h-full items-center justify-center bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center align-middle font-Handwriting text-4xl  text-transparent lg:text-6xl"
        >
          Uniqueness is <br></br>
          paramount
        </animated.h2>
      </div>
    </article>
  );
};

export default UniquenessIsParamount;

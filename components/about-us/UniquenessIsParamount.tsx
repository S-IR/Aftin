import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const UniquenessIsParamount = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: false,
  });

  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateX(${hTwoRefVisible ? 0 : 10}%)`,
  });
  const [zrot, setZrot] = useState(0);
  const [xrot, setXrot] = useState(0);
  const [yrot, setYrot] = useState(0);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setXrot((event.clientX * 15) / window.innerWidth - 15);
      setYrot((event.clientX * 15) / window.innerHeight - 15);
      setZrot((prev) => prev + (Math.random() - 0.5) * 2);
      console.log("e", event);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!hTwoRefVisible) {
      setZrot(0);
      setXrot(0);
      setYrot(0);
    }
  }, [hTwoRefVisible]);

  const animatedProps = useSpring({
    transform: `rotateX(${xrot}deg) rotateY(${yrot}deg) rotateZ(${zrot}deg)`,
    config: { tension: 280, friction: 60 },
  });
  return (
    <article className="z-20 flex h-[75vh] w-full rotate-[6deg] items-center justify-center overflow-clip border-t-2 border-dashed border-orange-400/20 align-middle ">
      <p className="w-1/2 -rotate-[6deg] p-2 pl-4 text-center font-serif text-2xl ">
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
      <div className="relative h-full w-1/2 -rotate-[6deg]">
        <animated.div
          style={animatedProps}
          className={"absolute top-0 left-0 -z-10 "}
        >
          <Image
            quality={100}
            src={"/about-us/UniquenessBanner.png"}
            alt={"banner for the people eat section of about us, Aftin"}
            width={1024}
            height={1024}
            className="rounded-full shadow-md shadow-gray-800/40 brightness-50 filter"
          />
        </animated.div>
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

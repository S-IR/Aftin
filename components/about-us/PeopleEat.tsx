import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const BeautySells = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: false,
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

  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateX(${hTwoRefVisible ? 0 : 10}%)`,
  });
  const animatedProps = useSpring({
    transform: `rotateX(${xrot}deg) rotateY(${yrot}deg) rotateZ(${zrot}deg)`,
    config: { tension: 280, friction: 60 },
  });
  return (
    <article className=" relative flex h-[90vh] w-full rotate-[6deg] items-center justify-center overflow-clip  border-b-2 border-dashed border-orange-400/20 align-middle">
      <p className="w-1/2 -rotate-[6deg] p-4 pl-10 text-center font-serif text-2xl">
        What food looks like will heavily determine what food tastes like. It is
        therefore artificial to put a hard distinction between how a meal tastes
        and how it looks.<br></br>
        <br></br>
        How a food “looks” (or better put, feels) can be controlled from the
        beginning by how someone gets to know about your place, what does your
        marketing evoke, how your restaurant looks inside and so forth.<br></br>
        <br></br>
        This is why we believe it’s essential that every single image that is
        going to be seen by the client has to be attractive and has to display
        your brand<br></br>
      </p>
      <div className="relative h-full w-1/2 -rotate-[6deg]">
        <animated.div
          style={animatedProps}
          className={"absolute top-0 left-0 -z-10 "}
        >
          <Image
            quality={100}
            src={"/about-us/PeopleEatBanner1.png"}
            alt={"banner for the people eat section of about us, Aftin"}
            width={1024}
            height={1024}
            className="rounded-full shadow-md shadow-gray-800/40 brightness-50 filter"
          />
        </animated.div>
        <animated.h2
          ref={hTwoRef}
          style={hTwoStyle}
          className=" flex h-full items-center justify-center bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center align-middle font-Handwriting text-4xl text-transparent  lg:text-6xl"
        >
          People eat <br></br> with their eyes first
        </animated.h2>
      </div>
    </article>
  );
};

export default BeautySells;

import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const BeautySells = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: true,
  });

  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateY(${hTwoRefVisible ? 0 : 20}%)`,
  });

  return (
    <article className="flex h-[75vh] w-full items-center justify-center border-y-2 border-dashed border-gray-400 align-middle">
      <p className="w-1/2 p-4 text-center font-serif text-2xl">
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
      <div className="relative h-full w-1/2">
        <Image
          alt="Banner for the People Eat section for About Us - Aftin"
          src={"/about-us/PeopleEatBanner1.png"}
          fill
          style={{ objectFit: "cover" }}
          className=" absolute top-0 left-0 -z-10 brightness-50  filter"
        />
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

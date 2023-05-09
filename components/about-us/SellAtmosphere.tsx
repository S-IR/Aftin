import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const SellAtmospheres = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: true,
  });

  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateY(${hTwoRefVisible ? 0 : 20}%)`,
  });

  return (
    <article className="flex h-[75vh] w-full items-center justify-center border-y-2 border-dashed border-gray-400 align-middle">
      <div className="relative h-full w-1/2">
        <Image
          alt="Banner for the People Eat section for About Us - Aftin"
          src={"/about-us/SellAtmosphereBanner.png"}
          fill
          style={{ objectFit: "cover" }}
          className="absolute top-0 left-0 -z-10 brightness-75 filter "
        />
        <animated.h2
          ref={hTwoRef}
          style={hTwoStyle}
          className=" flex h-full items-center justify-center bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center align-middle font-Handwriting text-4xl text-transparent  lg:text-6xl"
        >
          Restaurants sell atmospheres <br></br>
          as much as they sell foods
        </animated.h2>
      </div>
      <p className="w-1/2 pl-4 text-center font-serif text-2xl">
        People don’t go to restaurants to just eat.<br></br>
        <br></br>
        They come to restaurants to enjoy an atmosphere. Be it a casual dinning
        experience, an old pub or a fine dinning restaurant, they all give their
        clients a feeling that’s part of the product ultimately <br></br>
        <br></br>
        If you merely sell food then this website is probably not for you
        <br></br>
      </p>
    </article>
  );
};

export default SellAtmospheres;

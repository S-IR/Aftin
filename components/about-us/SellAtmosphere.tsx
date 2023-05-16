import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const SellAtmospheres = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: false,
  });

  const [zrot, setZrot] = useState(0);
  const [xrot, setXrot] = useState(0);
  const [yrot, setYrot] = useState(0);
  useEffect(() => {
    if (!hTwoRefVisible) {
      setZrot(0);
      setXrot(0);
      setYrot(0);
    }
  }, [hTwoRefVisible]);

  useEffect(() => {
    const handleMouseMoveSellAtmosphere = (event: MouseEvent) => {
      setXrot(
        (event.clientX * 15 + Math.random() * 10) / window.innerWidth - 15
      );
      setYrot(
        (event.clientX * 15 + Math.random() * 10) / window.innerHeight - 15
      );
      setZrot((prev) => prev + (Math.random() - 0.5) * 1.5);
      console.log("e", event);
    };

    window.addEventListener("mousemove", handleMouseMoveSellAtmosphere);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveSellAtmosphere);
    };
  }, []);
  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateX(${hTwoRefVisible ? 0 : -10}%)`,
  });
  const animatedProps = useSpring({
    transform: `rotateX(${xrot}deg) rotateY(${yrot}deg) rotateZ(${zrot}deg)`,
    config: { tension: 280, friction: 60 },
  });
  return (
    <article className="flex h-[75vh] w-full rotate-[6deg] items-center justify-center overflow-clip align-middle">
      <div className="relative h-full w-1/2 -rotate-[6deg]">
        <animated.div
          style={animatedProps}
          className={"absolute top-0 left-0 -z-10 "}
        >
          <Image
            quality={100}
            src={"/about-us/SellAtmosphereBanner.png"}
            alt={"banner for the people eat section of about us, Aftin"}
            width={1024}
            height={1024}
            // style={{ objectFit: "scale-down" }}
            className="rounded-full shadow-md shadow-gray-800/40 filter"
          />
        </animated.div>
        <animated.h2
          ref={hTwoRef}
          style={hTwoStyle}
          className=" flex h-full items-center justify-center bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center align-middle font-Handwriting text-4xl text-transparent  lg:text-6xl"
        >
          Restaurants sell atmospheres <br></br>
          as much as they sell foods
        </animated.h2>
      </div>
      <p className="w-1/2 -rotate-[6deg] pl-4 text-center font-serif text-2xl">
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

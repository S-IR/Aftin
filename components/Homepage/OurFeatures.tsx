import Link from "next/link";
import React from "react";
import { homepageFeaturesList } from "../../constants/homepage/homepageFeaturesList";
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from "react-intersection-observer";
import Image from "next/legacy/image";
import { useIsMobile } from "../../hooks/useIsMobile";

/**
 * Forth component of the homepage. Meant to display the main features of Aftin
 * @returns
 */
const OurFeatures = () => {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateX(${hTwoVisible ? 0 : 20}%)`,
  });
  const isMobile = useIsMobile();
  return (
    <section className="relative flex h-auto  min-h-[75vh] w-screen flex-col items-center border-y-2 border-dashed border-brown-900/40  px-4">
      <Image
        className="absolute top-0 left-0 brightness-[25%] filter"
        layout="fill"
        quality={100}
        src={"/homepage/OurFeaturesBG.png"}
        alt={"Background image to present our features on Aftin Homepage"}
      />
      <a.h2
        className=" mt-6 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-3xl text-transparent  text-white  md:mt-20 md:text-8xl"
        ref={hTwoRef}
        style={hTwoStyles}
      >
        We are at your disposal
      </a.h2>
      <a.h3
        className="text-serif text-md transition-all duration-300 md:text-lg"
        style={hTwoStyles}
      >
        We are here to achieve your desired aesthetic and attract the most
        amount of customers{" "}
      </a.h3>
      <div className=" z-20 m-4 grid h-auto grid-cols-2 ">
        {homepageFeaturesList.map((feature, i) => {
          return (
            <Link
              href={feature.href}
              key={feature.href}
              className={
                "relative z-30 flex h-auto w-full items-center justify-center bg-black/10 align-middle transition-all duration-300 hover:bg-black/30"
              }
            >
              <div
                className={`group ${
                  isMobile ? "border-2 border-gray-700/40" : ""
                } flex h-auto min-h-[25vh] w-full flex-col items-center justify-center bg-black/20  align-middle  transition-all duration-300 hover:bg-black/30 lg:h-[25vh]`}
              >
                <p className="w-full bg-gradient-to-br from-red-300 to-white bg-clip-text text-center font-serif text-lg text-yellow-300  text-transparent transition-all duration-300 group-hover:-translate-y-6 md:w-auto md:text-4xl">
                  {feature.title}
                </p>
                {!isMobile && (
                  <p className="mx-4 w-[100%-1rem]  text-center opacity-0 transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-100">
                    {feature.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default OurFeatures;

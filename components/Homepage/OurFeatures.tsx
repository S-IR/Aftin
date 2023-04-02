import Link from "next/link";
import React from "react";
import { homepageFeaturesList } from "../../constants/homepage/homepageFeaturesList";
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from "react-intersection-observer";

const OurFeatures = () => {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateX(${hTwoVisible ? 0 : 20}%)`,
  });

  return (
    <section className="flex h-auto min-h-[75vh] w-screen flex-col items-center border-2 border-gray-500 bg-white/10   px-4">
      <a.h2
        className=" mt-6 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-3xl text-transparent  text-white  md:mt-20 md:text-8xl"
        ref={hTwoRef}
        style={hTwoStyles}
      >
        We are at your disposal
      </a.h2>
      <a.h4
        className="text-serif text-md transition-all duration-300 md:text-lg"
        style={hTwoStyles}
      >
        We are here to achieve your desired aesthetic and attract the most
        amount of customers{" "}
      </a.h4>
      <div className=" m-4 grid grid-cols-2 ">
        {homepageFeaturesList.map((feature) => {
          return (
            <Link
              href={feature.href}
              key={feature.href}
              className={
                "flex h-[15vh] w-full items-center justify-center bg-black/10 align-middle transition-all duration-300 hover:bg-black/30"
              }
            >
              <a>
                <div
                  className={
                    "group flex h-[35vh] w-full items-center justify-center bg-black/20  align-middle transition-all duration-300 hover:bg-black/30"
                  }
                >
                  <div className="flex flex-col items-center justify-center align-middle">
                    <p className="w-min bg-gradient-to-br from-red-300 to-white bg-clip-text font-serif text-lg text-yellow-300  text-transparent transition-all duration-300 group-hover:-translate-y-6 md:w-auto md:text-2xl">
                      {feature.title}
                    </p>
                    <p className="text-center opacity-0  transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-100">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default OurFeatures;

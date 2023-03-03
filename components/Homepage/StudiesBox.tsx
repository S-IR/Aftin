import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StudiesList } from "../../constants/StudiesList";
import { useTrail, animated as a, useSpring } from "react-spring";

function StudiesBox() {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateX(${hTwoVisible ? 0 : -5}%)`,
  });

  return (
    <section className="relative">
      <div className="ml-[15vw] mt-[25vh] flex flex-col">
        <a.h2
          ref={hTwoRef}
          style={hTwoStyles}
          className={`my-10 font-Handwriting text-4xl   font-bold text-orange-300 opacity-0 transition-all duration-300 md:text-8xl `}
        >
          Beauty Sells
        </a.h2>
        <a.p
          className="ml-10 font-serif text-lg font-light transition-all duration-300"
          style={hTwoStyles}
        >
          People judge a restaurant by its images. <br></br>
          Is essential therefore to be able to display your branding personality
          through every image that your potential clients might see
        </a.p>
      </div>

      <figure className="text-md mt-16 mb-10 ml-3  flex w-screen flex-col justify-center  space-y-2 px-2 font-serif md:mt-40 md:mb-28 md:flex-row md:space-x-4 ">
        {StudiesList.map((study) => (
          <div
            key={study.text}
            className={`flex h-48 w-full items-center justify-center  rounded-sm bg-brown-900/30 align-middle drop-shadow-xl transition-all  duration-300 hover:bg-brown-900 md:h-72 md:w-72`}
          >
            <Link href={study.href}>
              <a className="w-[200px]">
                <p className="text-wrap   break-words font-Handwriting font-light transition-all duration-300 hover:text-gray-300 hover:underline ">
                  {study.text}
                </p>
              </a>
            </Link>
          </div>
        ))}
      </figure>
    </section>
  );
}

export default StudiesBox;

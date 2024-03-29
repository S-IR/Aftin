import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StudiesList } from "../../constants/homepage/StudiesList";
import { useTrail, animated as a, useSpring } from "react-spring";
import Image from "next/image";

/**
 * Third component of the homepage. Meant to give data in order to be more authoritative.
 * @returns
 */
function StudiesBox() {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateX(${hTwoVisible ? 0 : -5}%)`,
  });

  return (
    <section className="relative h-auto lg:h-screen  ">
      <div className="absolute -top-52  right-2 overflow-hidden">
        <Image
          width={612}
          height={612}
          style={{ objectFit: "scale-down" }}
          quality={100}
          alt={"Plate of a steak with different vegetables"}
          src={"/homepage/studiexBoxImg.png"}
        />
      </div>
      <div className="mt-[10vh] ml-[15vw] flex flex-col">
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
          <br></br>
          through every image that your potential clients might see
        </a.p>
      </div>

      <figure className="text-md mt-16 mb-10 ml-3  flex w-screen flex-col items-center justify-center space-y-2  px-2 align-middle font-serif md:mt-40 md:mb-28 md:flex-row md:space-x-4 md:space-y-0 ">
        {StudiesList.map((study) => (
          <div
            key={study.text}
            className={`flex h-32 w-3/4 items-center justify-center  rounded-sm bg-brown-900/30 align-middle drop-shadow-xl transition-all  duration-300 hover:bg-brown-900 md:h-72 md:w-72`}
          >
            <Link href={study.href} className="w-[200px]">
              <p className="text-wrap ml-2  break-words text-center font-Handwriting font-light transition-all duration-300 hover:text-gray-300 hover:underline ">
                {study.text}
              </p>
            </Link>
          </div>
        ))}
      </figure>
    </section>
  );
}

export default StudiesBox;

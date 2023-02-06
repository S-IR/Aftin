import Link from "next/link";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StudiesList } from "../../constants/StudiesList";

function StudiesBox() {
  const { ref: animatedDOM, inView: animatedDOMVisible } = useInView();

  return (
    <section className="relative">
      <div className="ml-[15vw] mt-[25vh] flex flex-col">
        <p
          ref={animatedDOM}
          className={`my-10   font-Handwriting text-4xl font-bold text-orange-300 opacity-0 md:text-8xl ${
            animatedDOMVisible ? "opacity-100" : ""
          }`}
        >
          Beauty Sells
        </p>
        <p className="ml-4 font-serif text-lg font-light">
          People judge a restaurant by its images. <br></br>
          Is essential therefore to be able to display your branding personality
          through every image that your potential clients might see
        </p>
      </div>

      <figure className="grid font-serif  ">
        <div className="text-md mt-40  mb-28 ml-3 flex  w-screen justify-center space-x-4 px-2 font-serif ">
          {StudiesList.map((study) => (
            <div
              key={study.text}
              className={`duration-300align-middle flex h-72 w-72 items-center justify-center rounded-sm  bg-brown-900/30 drop-shadow-xl transition-all hover:bg-brown-900`}
            >
              <Link href={study.href}>
                <a className="w-[200px]">
                  <p className="text-wrap mr-4  break-words font-Handwriting font-light transition-all duration-300 hover:text-gray-300 hover:underline ">
                    {study.text}
                  </p>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </figure>
    </section>
  );
}

export default StudiesBox;

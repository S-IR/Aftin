import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const HomepageHireProfessional = () => {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateX(${hTwoVisible ? 0 : 20}%)`,
  });

  const hFourStyle = useSpring({
    opacity: hTwoVisible ? 1 : 0,
  });

  return (
    <section className="relative flex min-h-screen justify-center space-y-4 text-center ">
      <div className="absolute -top-2 left-2 overflow-hidden">
        <Image
          width={612}
          height={612}
          objectFit={"scale-down"}
          quality={100}
          src={"/frontend-used-images/homepage/HomepageHireProfessionalImg.png"}
        />
      </div>
      <div className="absolute top-40 right-28 flex flex-col items-center">
        <a.h2
          className="mb-10  bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-4xl text-transparent shadow-lg drop-shadow-xl transition-all duration-300 md:text-8xl"
          ref={hTwoRef}
          style={hTwoStyles}
        >
          Hire <br></br> a professional
        </a.h2>
        <a.h3
          className=" text-md mb-10 font-serif md:text-lg"
          style={hFourStyle}
        >
          To design your desired website, banner, logo or any graphic design
          element
        </a.h3>
        <Link href={"/request-design"}>
          <a className="buttons-3 font-Handwriting text-xl font-thin text-red-300 transition-all duration-300 hover:text-white md:text-2xl">
            learn more
          </a>
        </Link>
      </div>
    </section>
    // {/*
    // <div className="flex justify-center space-y-2 text-center ">
    //   <h2 className=" font-serif text-2xl shadow-lg drop-shadow-xl md:text-6xl">
    //     Or:
    //   </h2>
    // </div>

    // <div className=" mt-20 flex h-auto w-auto flex-col items-center justify-center py-6 align-top md:mt-0 md:flex-row">
    //   <button className={`${styles.homePricing}`}>
    //     <h2 className="py-2 text-lg font-bold text-red-600 ">
    //       Aftin Exquisite
    //     </h2>
    //     <p>
    //       For leaders who want to <br></br> unlock our full Graphic Design
    //       toolkit <br></br> to achieve the best results
    //     </p>
    //   </button>

    //   <button className={`${styles.homePricing}`}>
    //     <h2 className="py-2 text-lg font-bold text-red-600 ">
    //       Aftin Premium
    //     </h2>
    //     <p>
    //       For small to medium sized enterprises who <br></br>
    //       need fitting stock images and perfect <br></br> graphic design art
    //     </p>
    //   </button>

    //   <button className={`${styles.homePricing} `}>
    //     <h2 className="py-2 text-lg font-bold text-red-600 ">Aftin Lite</h2>
    //     <p>
    //       For individuals who need to get <br></br>
    //       appealing food images quick.
    //     </p>
    //   </button>
    // </div> */}
  );
};

export default HomepageHireProfessional;

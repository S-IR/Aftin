import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";

const HomepageHireProfessional = () => {
  return (
    <section className="relative flex min-h-screen justify-center space-y-4 text-center ">
      <div className="absolute top-40 right-28 flex flex-col items-center">
        <h2 className="mb-10  bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-2xl text-transparent shadow-lg drop-shadow-xl md:text-8xl">
          Hire <br></br> a professional
        </h2>
        <p className=" mb-10 font-serif text-lg">
          To design your desired website, banner, logo or any graphic design
          element
        </p>
        <Link href={"/request-design"}>
          <a className="buttons-3 font-Handwriting text-2xl font-thin text-red-300 transition-all duration-300 hover:text-white">
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
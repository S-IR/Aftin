import Image from "next/image";
import React from "react";

const TopBanner = () => {
  return (
    <section className="relative h-[100vh] w-full border-y-2 border-dashed border-gray-400  ">
      <Image
        className="absolute top-0 left-0 brightness-50 filter"
        src={"/about-us/top-banner.png"}
        fill
        alt={"Top banner image for About Us, Aftin"}
      />
      <h1 className="absolute bottom-28 left-16 font-Handwriting text-4xl font-extralight text-gray-300  ">
        Who we are
      </h1>
    </section>
  );
};

export default TopBanner;

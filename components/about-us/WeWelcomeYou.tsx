import Image from "next/image";
import React from "react";

const WeWelcomeYou = () => {
  return (
    <article className="relative flex h-[30vh] items-center justify-center align-middle">
      <Image
        alt="Banner for the People Eat section for About Us - Aftin"
        src={"/about-us/bottom-banner.png"}
        fill
        style={{ objectFit: "cover" }}
        className="absolute top-0 left-0 -z-10 brightness-50 filter"
      />
      <h2 className=" flex h-full items-center justify-center bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center align-middle font-Handwriting text-4xl  text-transparent lg:text-6xl">
        We welcome you to continue with us
      </h2>
    </article>
  );
};

export default WeWelcomeYou;

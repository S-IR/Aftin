import Image from "next/image";
import React, { useState } from "react";
import { useSpring, animated, config, to } from "react-spring";

interface props {
  premiumText: boolean;
  tier: "silver" | "gold";
}

const PremiumIcon = ({ premiumText, tier }: props) => {
  return (
    <div className="absolute bottom-2 right-2 flex  items-center justify-center rounded-lg align-middle ">
      <p
        className={`overflow-hidden  text-xs   ${
          premiumText ? `opacity-100` : `opacity-0`
        } font-serif transition-all duration-300 `}
      >
        Premium
      </p>
      <Image
        src={`/website-gallery/${tier}Icon.webp`}
        style={{ objectFit: "scale-down" }}
        width={32}
        height={32}
        quality={100}
        alt="Premium image icon"
        className={`${
          premiumText ? `opacity-100` : `opacity-60`
        } transition-all duration-300`}
      />
    </div>
  );
};

export default PremiumIcon;

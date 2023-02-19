import Image from "next/image";
import React, { useState } from "react";
import { useSpring, animated, config, to } from "react-spring";

interface props {
  premiumText: boolean;
}

const PremiumIcon = ({ premiumText }: props) => {
  return (
    <div className="absolute bottom-5 right-5 flex items-center justify-center rounded-lg align-middle ">
      <Image
        src="/frontend-used-images/PremiumIcon.png"
        width={32}
        height={32}
        alt="Premium image icon"
      />
      <p
        className={`overflow-hidden text-sm   ${
          premiumText ? `flex` : `hidden`
        } `}
      >
        Premium
      </p>
    </div>
  );
};

export default PremiumIcon;

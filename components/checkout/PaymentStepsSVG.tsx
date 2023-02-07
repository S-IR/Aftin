import React, { useEffect, useState } from "react";

import { animated, useSpring } from "react-spring";

const PaymentStepsSVG = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, 1);
  }, []);

  useEffect(() => {
    console.log(startAnimation);
  }, [startAnimation]);

  return (
    <svg viewBox="0 0 1980 178" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_14_89)">
        <rect width="1980" height="178" fill="white" fill-opacity="0.2" />
        <path d="M597.5 97H955" stroke="black" stroke-width="2" />
        <path d="M1024.5 97H1382.5" stroke="black" stroke-width="2" />
        <path d="M1454 99H1978" stroke="black" stroke-width="2" />
        <path
          d="M1008.36 71.32L982 97.68L967.64 83.36L962 89L982 109L1014 77L1008.36 71.32ZM990 49C967.92 49 950 66.92 950 89C950 111.08 967.92 129 990 129C1012.08 129 1030 111.08 1030 89C1030 66.92 1012.08 49 990 49ZM990 121C972.32 121 958 106.68 958 89C958 71.32 972.32 57 990 57C1007.68 57 1022 71.32 1022 89C1022 106.68 1007.68 121 990 121Z"
          fill="black"
        />
        <path
          d="M1436.36 71.32L1410 97.68L1395.64 83.36L1390 89L1410 109L1442 77L1436.36 71.32ZM1418 49C1395.92 49 1378 66.92 1378 89C1378 111.08 1395.92 129 1418 129C1440.08 129 1458 111.08 1458 89C1458 66.92 1440.08 49 1418 49ZM1418 121C1400.32 121 1386 106.68 1386 89C1386 71.32 1400.32 57 1418 57C1435.68 57 1450 71.32 1450 89C1450 106.68 1435.68 121 1418 121Z"
          fill="black"
        />
        <path d="M-4 94.5H523.5" stroke="black" stroke-width="2" />
        <path
          d="M580.36 71.32L554 97.68L539.64 83.36L534 89L554 109L586 77L580.36 71.32ZM562 49C539.92 49 522 66.92 522 89C522 111.08 539.92 129 562 129C584.08 129 602 111.08 602 89C602 66.92 584.08 49 562 49ZM562 121C544.32 121 530 106.68 530 89C530 71.32 544.32 57 562 57C579.68 57 594 71.32 594 89C594 106.68 579.68 121 562 121Z"
          fill="#FCD403"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_89">
          <rect width="1980" height="178" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PaymentStepsSVG;

function CheckmarkPart({ d, startAnimation }) {
  const [checkmarkLength, setCheckmarkLength] = useState<null | number>(null);

  const animatedStyle = useSpring({
    strokeDashArray: checkmarkLength,
    strokeDashoffset: startAnimation ? 0 : checkmarkLength,
  });

  return (
    <animated.path
      strokeDasharray={1}
      strokeDashoffset={20}
      className={`mt-auto w-full`}
      fill="#FFD600"
      ref={(ref) => {
        setCheckmarkLength(ref?.getTotalLength() || 0);
      }}
      d={d}
    />
  );
}

function LinePart({ d, startAnimation }) {
  const [lineLength, setLineLength] = useState<null | number>(null);

  const animatedStyle = useSpring({
    strokeDasharray: lineLength,
    strokeDashoffset: startAnimation ? 0 : lineLength,
  });

  return (
    <animated.path
      style={animatedStyle}
      stroke={"black"}
      stroke-width={"6"}
      ref={(ref) => {
        setLineLength(ref?.getTotalLength() || 0);
      }}
      d={d}
    />
  );
}

import React, { useEffect, useState } from "react";

import { animated, useSpring } from "react-spring";

const PaymentStepsSVG = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, 1);
  }, []);

  return (
    <svg viewBox="0 0 1980 178" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_14_89)">
        <path d="M597.5 97H955" stroke="black" stroke-width="2" />
        <path d="M1024.5 97H1382.5" stroke="black" stroke-width="2" />
        <path d="M1454 99H1978" stroke="black" stroke-width="2" />
        <path
          d="M982.354 98.0336L1008.36 72.0284L1013.29 76.9988L982 108.293L962.707 89L967.64 84.0666L981.647 98.034L982 98.3866L982.354 98.0336ZM950.5 89C950.5 67.1961 968.196 49.5 990 49.5C1011.8 49.5 1029.5 67.1961 1029.5 89C1029.5 110.804 1011.8 128.5 990 128.5C968.196 128.5 950.5 110.804 950.5 89ZM957.5 89C957.5 106.956 972.044 121.5 990 121.5C1007.96 121.5 1022.5 106.956 1022.5 89C1022.5 71.0439 1007.96 56.5 990 56.5C972.044 56.5 957.5 71.0439 957.5 89Z"
          stroke="#FCD403"
        />
        <path
          d="M1410.35 98.0336L1436.36 72.0284L1441.29 76.9988L1410 108.293L1390.71 89L1395.64 84.0666L1409.65 98.034L1410 98.3866L1410.35 98.0336ZM1378.5 89C1378.5 67.1961 1396.2 49.5 1418 49.5C1439.8 49.5 1457.5 67.1961 1457.5 89C1457.5 110.804 1439.8 128.5 1418 128.5C1396.2 128.5 1378.5 110.804 1378.5 89ZM1385.5 89C1385.5 106.956 1400.04 121.5 1418 121.5C1435.96 121.5 1450.5 106.956 1450.5 89C1450.5 71.0439 1435.96 56.5 1418 56.5C1400.04 56.5 1385.5 71.0439 1385.5 89Z"
          stroke="#FCD403"
        />
        <path d="M-4 94.5H523.5" stroke="black" stroke-width="2" />
        <path
          d="M554.354 98.0336L580.359 72.0284L585.294 76.9988L554 108.293L534.707 89L539.64 84.0666L553.647 98.034L554 98.3866L554.354 98.0336ZM522.5 89C522.5 67.1961 540.196 49.5 562 49.5C583.804 49.5 601.5 67.1961 601.5 89C601.5 110.804 583.804 128.5 562 128.5C540.196 128.5 522.5 110.804 522.5 89ZM529.5 89C529.5 106.956 544.044 121.5 562 121.5C579.956 121.5 594.5 106.956 594.5 89C594.5 71.0439 579.956 56.5 562 56.5C544.044 56.5 529.5 71.0439 529.5 89Z"
          stroke="#FCD403"
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

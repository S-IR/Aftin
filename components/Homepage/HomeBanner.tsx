import Image from "next/image";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import {
  useSpringRef,
  useTransition,
  animated,
  AnimatedProps,
} from "react-spring";
import styles from "../../styles/Home.module.css";
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from "react-intersection-observer";

const imageArray = [
  "/frontend-used-images/homeImageInPhone1.png",
  "/frontend-used-images/homeImageInPhone2.png",
  "/frontend-used-images/homeImageInPhone3.png",
];
const pages: ((
  props: AnimatedProps<{ style: CSSProperties }>
) => React.ReactElement)[] = imageArray.map((image) =>
  // eslint-disable-next-line react/display-name
  ({ style }) => (
    <animated.div style={{ ...style, position: "absolute" }}>
      <img src={image} layout={"fill"} />
    </animated.div>
  )
);

function HomeBanner() {
  const [index, set] = useState(0);
  useEffect(() => {
    setInterval(() => {
      set((index) => (index + 1) % 3);
    }, 3000);
  }, []);

  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { transform: "translate3d(100%,0,0)" },
    enter: { transform: "translate3d(0%,0,0)" },
    leave: { transform: "translate3d(-100%,0,0)" },
  });

  const { ref: hOneRef, inView: hOneVisible } = useInView({
    triggerOnce: true,
  });

  const hOneStyles = useSpring({
    opacity: hOneVisible ? 1 : 0,
    transform: `translateY(${hOneVisible ? 0 : 20}%)`,
  });

  useEffect(() => {
    transRef.start();
  }, [index]);
  return (
    <section className="h-screen">
      <div className={`relative h-[900px] max-w-full `}>
        <a.h1
          className={`absolute top-32 left-10
         z-50 flex  flex-col rounded  border-white/80 p-2 text-center font-Handwriting
        font-thin tracking-wider text-orange-300  opacity-70  shadow-black   drop-shadow-lg  md:text-7xl ${styles.homeBannerHOne}  `}
          ref={hOneRef}
          style={hOneStyles}
        >
          <span className="p-2 text-6xl ">The graphic persuader</span>
          <span className=" text-6xl">of the</span>
          <span className=" text-6xl"> food industry</span>
        </a.h1>
      </div>
    </section>
  );
}

export default HomeBanner;

import Image from "next/legacy/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTrail, animated as a, useSpring, interpolate } from "react-spring";

/**
 * Second component in order from the top of the homepage. Component meant to have a descriptive phrase of the company and some sort of animation in order to entice people to read further
 * @returns
 */
function HomeIntro() {
  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  // this value stores how far in therms of percentage this component has been scrolled
  const [scrollPositionPercent, setScrollPositionPercent] = useState(0);

  // calculates the scroll position, if it's further than the previous component's height (screen height) plus the current component height (75% screen height) then stop calculating
  const handleScroll = () => {
    if (window.scrollY > 1.75 * screen.height) return;

    const position = window.scrollY;
    const maxHeight = screen.height * 1.75;

    setScrollPositionPercent((position * 100) / maxHeight);
  };

  //adds the event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageOneStyles = useSpring({
    from: { rotate: 0 },
    //after getting the scroll percentage we basically map it from the 0-100 interval to 0-15

    to: { rotate: (scrollPositionPercent * 15) / 100 },
  });

  const imageTwoStyles = useSpring({
    from: { rotate: 0 },
    //after getting the scroll percentage we basically map it from the 0-100 interval to 0-15

    to: { rotate: -(scrollPositionPercent * 15) / 100 },
  });

  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateY(${hTwoVisible ? 0 : 20}%)`,
  });

  const hThreeStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
  });

  return (
    <section className="relative h-[800px] flex-col justify-center space-y-8  overflow-hidden border-2 border-dashed border-brown-900/40 bg-white/10 pt-10 text-center text-2xl shadow-white drop-shadow-xl">
      <a.div
        className="absolute -bottom-1/4 -left-1/4  flex justify-start overflow-y-hidden overflow-x-visible align-top "
        style={{ ...imageOneStyles, transformOrigin: "bottom" }}
      >
        <Image
          src={"/homepage/homeIntro1.png"}
          width={1024}
          height={1024}
          style={{ objectFit: "none", width: 1024, height: 1024 }}
          quality={100}
          className={"!h-[1024px] !w-[1024px] origin-bottom  filter"}
          alt={"home intro banner 1 for Aftin"}
        />
      </a.div>
      <a.div
        className="absolute -bottom-1/4 -right-1/4  h-[800px] w-[800px] "
        style={{ ...imageTwoStyles, transformOrigin: "bottom" }}
      >
        <Image
          src={"/homepage/homeIntro2.png"}
          width={1024}
          height={1024}
          quality={100}
          style={{ objectFit: "none", width: 1024, height: 1024 }}
          className={"overflow-hiddenfilter !h-[1024px] !w-[1024px]"}
          alt={"home intro banner 2 for Aftin"}
        />
      </a.div>
      <a.h2
        style={hTwoStyles}
        ref={hTwoRef}
        className={`!m-0 translate-y-20 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-4xl text-transparent opacity-0 transition-all  duration-1000 ease-out md:text-8xl `}
      >
        Make<br></br> Your Restaurant <br></br> Stand Out
      </a.h2>
      <a.h3
        style={hThreeStyles}
        ref={hTwoRef}
        className={`translate-y-20 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-2xl text-transparent opacity-0  transition-all duration-1000 ease-out `}
      >
        By utilizing elegant, colorful and <br></br> unique images and graphic
        design elements
      </a.h3>
    </section>
  );
}

export default HomeIntro;

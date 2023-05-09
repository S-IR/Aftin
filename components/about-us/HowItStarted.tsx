import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const HowItStarted = () => {
  const { ref: hTwoRef, inView: hTwoRefVisible } = useInView({
    triggerOnce: true,
  });

  const hTwoStyle = useSpring({
    opacity: hTwoRefVisible ? 1 : 0,
    transform: `translateY(${hTwoRefVisible ? 0 : 20}%)`,
  });

  return (
    <article className="flex h-[75vh] w-full items-center justify-center border-y-2 border-dashed border-gray-400 align-middle">
      <p className="w-1/2 pl-4 font-serif">
        As I stare at the doorknob my eyes immediately notice the large paper
        that has been whirled onto my door. <br></br>
        <br></br>I pull out the flyer and open the door . Then I throw the paper
        where I've thrown all of the other restaurant advertising materials that
        I've gotten, namely on a stack in a dusty corner of the living room.
        <br></br>
        <br></br>
        But this time as I move towards the stack my mind starts to notices
        something . This collection of restaurant flyers , pamphlets, catalogues
        and brochures is getting rather large. And I’ve moved here only 2 months
        ago!<br></br>
        <br></br>I tell myself „why not take a look at them before throwing all
        of them in the trash can?”. So I pull what had to be approximately 10 to
        15 advertising materials and start comparing them.<br></br>
        <br></br>
        They all look the same... and they’re all boring
      </p>
      <animated.h2
        style={hTwoStyle}
        ref={hTwoRef}
        className="w-1/2 bg-gradient-to-r from-white to-orange-600 bg-clip-text text-center font-Handwriting text-4xl text-transparent  lg:text-8xl"
      >
        How it started
      </animated.h2>
    </article>
  );
};

export default HowItStarted;

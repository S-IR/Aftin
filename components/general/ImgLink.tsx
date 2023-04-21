import { useGesture } from "@use-gesture/react";
import Image from "next/legacy/image";
import React, { useEffect, useRef } from "react";
import { useSpring, animated, config, to } from "react-spring";

interface props {
  url: `/${string}`;
  alt: string;
  w: number;
  h: number;
}

const ImgLink = ({ url, alt, w, h }: props) => {
  // this is the component that is displayed when you
  const target = useRef(null);

  const [{ x, y, rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      config: { mass: 5, tension: 350, friction: 40, duration: 0 },
    })
  );
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", preventDefault);
    document.addEventListener("gesturechange", preventDefault);

    return () => {
      document.removeEventListener("gesturestart", preventDefault);
      document.removeEventListener("gesturechange", preventDefault);
    };
  }, []);

  useGesture(
    {
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { target, eventOptions: { passive: false } }
  );
  return (
    <div className={`w-[${w * 2}px] [h-${h * 2}px]`}>
      <animated.div
        ref={target}
        className="relative h-auto w-auto  cursor-pointer  rounded-sm   bg-inherit bg-clip-border shadow-none shadow-white transition duration-300 ease-in-out before:border-inherit hover:translate-x-1 hover:shadow-lg "
        style={{
          transform: "perspective(600px)",
          x,
          y,
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <Image
          src={url}
          alt={alt}
          width={w}
          height={h}
          style={{ objectFit: "cover" }}
          className="rounded-md   "
        />
      </animated.div>
    </div>
  );
};

export default ImgLink;

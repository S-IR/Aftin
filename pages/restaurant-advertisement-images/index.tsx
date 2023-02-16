import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Button from "../../components/general/Button";
import { handleRequestDesigner } from "../../model/handleRequestDesigner";
import { useSpring, animated, config, to } from "react-spring";
import { useGesture } from "@use-gesture/react";

import Link from "next/link";
import ImgLink from "../../components/general/ImgLink";
import { Masonry } from "@mui/lab";
import { CategoryPageAdvertImages } from "../../constants/category-pages/CategoryBanners";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <>
      <Masonry
        columns={3}
        spacing={2}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={2}
        className={"mx-auto  flex max-w-6xl"}
      >
        {CategoryPageAdvertImages.map((list) => {
          if (typeof list !== "string") {
            return (
              <div
                key={list.name}
                className="group relative m-2 flex justify-center rounded-md align-middle shadow-gray-700  drop-shadow-xl  transition-all duration-300"
              >
                <Image
                  alt={`representative image from ${list.name.replace(
                    "-",
                    " "
                  )}`}
                  width={list.w}
                  height={list.h}
                  objectFit={"cover"}
                  src={`/frontend-used-images/category-images/${list.catName}/${list.subCatName}.png`}
                  className={"grayscale-[95%] filter"}
                />
                <button
                  className={`absolute top-1/2 left-1/2  text-center font-serif  text-2xl text-red-300 !grayscale-0 !filter transition-all duration-300 hover:text-red-500 `}
                  onClick={() =>
                    router.push(
                      `/restaurant-${list.catName}/${list.subCatName}`
                    )
                  }
                >
                  {list.name}
                </button>
              </div>
            );
          } else {
            return (
              <>
                <h3 className="m-16 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-4xl text-transparent drop-shadow-xl">
                  {list}
                </h3>
              </>
            );
          }
        })}
      </Masonry>
    </>
  );
};

export default Index;

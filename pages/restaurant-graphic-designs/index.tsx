import Image from "next/image";
import React, { useEffect, useRef } from "react";

import { Masonry } from "@mui/lab";
import { CategoryPageGraphicImages } from "../../constants/category-pages/CategoryBanners";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import Head from "next/head";
import { NextSeo } from "next-seo";

const Index = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <NextSeo
          title={"Unique Restaurant Graphic Design Templates"}
          description={
            "Mesmerizing unique menus, banners, brochures and business card templates for restaurant owners"
          }
        />
      </Head>
      <Masonry
        columns={isMobile ? 1 : 3}
        spacing={2}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={2}
        className={"mx-auto  flex max-w-6xl"}
      >
        {CategoryPageGraphicImages.map((list) => {
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
                  src={`/frontend-used-images/category-images/${list.catName}/${list.secondDegCatName}.png`}
                  className={"brightness-50 filter"}
                />
                <button
                  className={`absolute top-1/2 left-1/2  text-center font-serif  text-2xl text-red-300 !grayscale-0 !filter transition-all duration-300 hover:text-red-500 `}
                  onClick={() =>
                    router.push(
                      `/restaurant-${list.catName}/${list.secondDegCatName}`
                    )
                  }
                >
                  {list.name}
                </button>
              </div>
            );
          } else {
            return (
              <div
                key={list}
                className="flex h-min w-auto flex-col items-center justify-center align-middle"
              >
                <h3 className="m-8  max-w-md bg-gradient-to-br from-red-300 to-white bg-clip-text text-center font-Handwriting text-3xl text-transparent drop-shadow-xl md:text-6xl">
                  {list}
                </h3>
                <button className="buttons-3 h-min ">
                  Request a custom design
                </button>
              </div>
            );
          }
        })}
      </Masonry>
    </>
  );
};

export default Index;

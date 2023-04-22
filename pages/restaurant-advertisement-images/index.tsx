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
import { isMobile } from "react-device-detect";
import Head from "next/head";
import { NextSeo } from "next-seo";

const Index = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={"Advertisement Images Library for Restaurants"}
        description={
          "Browse unique food advertisement images meant for restaurant owners"
        }
      />
      <main className="flex h-auto w-full flex-col items-center justify-center align-middle">
        <h1 className="m-4 bg-gradient-to-br from-red-300 to-white bg-clip-text text-center font-Handwriting text-4xl text-transparent drop-shadow-xl md:m-16 md:text-6xl">
          What Advertisement Image do you need?
        </h1>
        <Masonry
          columns={isMobile ? 1 : 3}
          spacing={2}
          defaultHeight={450}
          defaultColumns={4}
          defaultSpacing={2}
          className={"  !mx-auto flex"}
        >
          {CategoryPageAdvertImages.map((list) => {
            return (
              <div
                key={list.name}
                className="group relative m-2 flex h-[24vh] w-full justify-center rounded-md border-y-2 border-dashed border-white/30 align-middle shadow-gray-700  drop-shadow-xl  transition-all duration-300 hover:border-orange-500"
              >
                <Image
                  alt={`representative image from ${list.name.replace(
                    "-",
                    " "
                  )}`}
                  fill
                  quality={100}
                  style={{ objectFit: "cover" }}
                  src={`/galleries-root/banner-${list.catName}/${list.secondDegCatName}.png`}
                  className={
                    "brightness-50 filter transition-all duration-300 group-hover:brightness-[25%]"
                  }
                />
                <button
                  className={`absolute top-1/2 left-1/2  text-center font-serif  text-2xl text-red-300 underline !grayscale-0 !filter transition-all duration-300 group-hover:text-red-500 `}
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
          })}
        </Masonry>
      </main>
    </>
  );
};

export default Index;

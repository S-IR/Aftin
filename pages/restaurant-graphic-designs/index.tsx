import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Button from "../../components/general/Button";
import { handleRequestDesigner } from "../../model/handleRequestDesigner";
import { useSpring, animated, config, to } from "react-spring";
import { useGesture } from "@use-gesture/react";

import Link from "next/link";
import ImgLink from "../../components/general/ImgLink";
import { Masonry } from "@mui/lab";
import {
  CategoryPageAdvertImages,
  CategoryPageGraphicImages,
} from "../../constants/category-pages/CategoryBanners";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import Head from "next/head";
import { NextSeo } from "next-seo";

const Index = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo
        title={"Menus, Banners and Brochure templates for Restaurants"}
        description={"Browse unique graphic designs made for Restaurants"}
      />
      <main className="flex h-auto w-full flex-col items-center justify-center align-middle">
        <h1 className="m-4 bg-gradient-to-br from-red-300 to-white bg-clip-text text-center font-Handwriting text-4xl text-transparent drop-shadow-xl md:m-16 md:text-6xl">
          What Graphic Design Templates do you need?
        </h1>
        {CategoryPageGraphicImages.map((list) => {
          return (
            <Link
              href={`/restaurant-${list.catName}/${list.secondDegCatName}`}
              key={list.name}
              className="group relative m-2 flex h-[24vh] w-screen justify-center rounded-md border-y-2 border-dashed border-white/30 align-middle shadow-gray-700  drop-shadow-xl  transition-all duration-300 hover:border-orange-500"
            >
              <Image
                alt={`representative image from ${list.name.replace("-", " ")}`}
                fill
                priority
                quality={100}
                style={{ objectFit: "cover" }}
                src={`/galleries-root/banner-${list.catName}/${list.secondDegCatName}.png`}
                className={
                  "brightness-50 filter transition-all duration-300 group-hover:brightness-[25%]"
                }
              />
              <p
                className={`absolute top-1/2 left-1/2  text-center font-serif  text-2xl text-red-300 underline !grayscale-0 !filter transition-all duration-300 group-hover:text-red-500 `}
              >
                {list.name}
              </p>
            </Link>
          );
        })}
      </main>
    </>
  );
};

export default Index;

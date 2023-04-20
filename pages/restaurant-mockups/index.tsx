import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  dayCategories,
  digitalCategories,
  nightCategories,
  previewCategoryNames,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/mockups/previewCategories";
import ChoosePreview from "../../components/mockups/ChoosePreview";
import dynamic from "next/dynamic";
import { useMockupsStore } from "../../zustand/MockupsStore/store";
import Head from "next/head";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Image from "next/image";
import { PhysicalOptions } from "../../components/mockups";

const PreviewCanvas = dynamic(
  () => import("../../components/mockups/PreviewCanvas"),
  {
    ssr: false,
  }
);
const PreviewDropzoneComp = dynamic(
  () => import("../../components/mockups/PreviewDropzoneComp"),
  {
    ssr: false,
  }
);

export type previewSelectedCategory = {
  name: previewCategoryNames;
  value: previewCategoryValues;
};

const Index: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<{
    name: previewCategoryNames;
    value: previewCategoryValues;
  }>({ name: "Phone", value: "phone" });

  const mockupType = null;
  const images = useMockupsStore((state) => state.images);
  const areThereImages = images.length > 0;
  return (
    <>
      <NextSeo
        title={"Images Previewer for Restaurants"}
        description={
          "Preview menus, banners or just food images with in different environments such as facebook post, outside or in hand"
        }
      />
      <main className="flex h-auto w-full flex-col items-center justify-center bg-gradient-to-br  from-red-300 to-white bg-clip-text align-middle text-transparent  ">
        <h1 className="my-8 text-center font-Handwriting text-4xl lg:my-12 lg:text-8xl ">
          What mockup do you need?
        </h1>
        <div className="flex w-full flex-col items-center justify-center align-middle">
          {/* DIGITAL CATEGORIES  */}

          <section className="flex h-auto border-t-2 border-black align-middle  lg:gap-6">
            <div className="ml-4 flex h-auto w-1/4 items-center justify-center align-middle">
              <h2 className="bg-gradient-to-br from-red-300 to-white  bg-clip-text align-middle font-Handwriting text-3xl text-transparent lg:text-6xl ">
                Digital Mockup Environments
              </h2>
            </div>
            <div className=" my-6 grid grow grid-cols-2 items-center justify-center gap-4  border-dashed lg:grid-cols-3">
              {digitalCategories.map((digitalCat) => (
                <Link
                  href={`/restaurant-mockups/${digitalCat.value}`}
                  className="group relative flex h-[20vh] w-[20vw] items-center justify-center align-middle "
                >
                  <Image
                    alt={`banner image for ${digitalCat.name} mockups for restaurants`}
                    src={digitalCat.source}
                    fill
                    className="absolute top-0 left-0 -z-10 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
                    style={{ objectFit: "scale-down" }}
                  />
                  <p className="font-Handwriting text-2xl text-white transition-all duration-300 group-hover:text-orange-300  ">
                    {digitalCat.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* DAY CATEGORIES  */}

          <section className="flex h-auto border-t-2 border-black align-middle  lg:gap-6">
            <div className="ml-4 flex h-auto w-1/4 items-center justify-center align-middle">
              <h2 className="bg-gradient-to-br from-red-300 to-white  bg-clip-text align-middle font-Handwriting text-3xl text-transparent lg:text-6xl ">
                Day-Themed Mockup Environments
              </h2>
            </div>
            <div className=" my-6 grid grow grid-cols-2 items-center justify-center gap-4  border-dashed last:mx-auto lg:grid-cols-3">
              {dayCategories.map((dayCategory) => (
                <Link
                  href={`/restaurant-mockups/${dayCategory.value}`}
                  className="group relative flex h-[20vh] w-[20vw] items-center justify-center align-middle "
                >
                  <Image
                    alt={`banner image for ${dayCategory.name} mockups for restaurants`}
                    src={dayCategory.source}
                    fill
                    className="absolute top-0 left-0 -z-10 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
                    style={{ objectFit: "scale-down" }}
                  />
                  <p className="font-Handwriting text-2xl text-white transition-all duration-300 group-hover:text-orange-300  ">
                    {dayCategory.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* NIGHT ENVIRONMENTS */}

          <section className="flex h-auto border-t-2 border-black align-middle  lg:gap-6">
            <div className="ml-4 flex h-auto w-1/4 items-center justify-center align-middle">
              <h2 className="bg-gradient-to-br from-red-300 to-white  bg-clip-text align-middle font-Handwriting text-3xl text-transparent lg:text-6xl ">
                Day-Themed Mockup Environments
              </h2>
            </div>
            <div className=" my-6 grid grow grid-cols-2 items-center justify-center gap-4  border-dashed last:mx-auto lg:grid-cols-3">
              {nightCategories.map((nightCategory) => (
                <Link
                  href={`/restaurant-mockups/${nightCategory.value}`}
                  className="group relative flex h-[20vh] w-[20vw] items-center justify-center align-middle "
                >
                  <Image
                    alt={`banner image for ${nightCategory.name} mockups for restaurants`}
                    src={nightCategory.source}
                    fill
                    className="absolute top-0 left-0 -z-10 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
                    style={{ objectFit: "scale-down" }}
                  />
                  <p className="font-Handwriting text-2xl text-white transition-all duration-300 group-hover:text-orange-300  ">
                    {nightCategory.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Index;

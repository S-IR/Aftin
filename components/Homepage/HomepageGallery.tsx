import { Masonry } from "@mui/lab";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React from "react";
import { isMobile } from "react-device-detect";
import { homepageGalleryList } from "../../constants/homepage/homepageGalleryList";

const HomepageGallery = () => {
  const router = useRouter();
  return (
    <section
      className={
        "e  flex overflow-hidden border-t-8 border-dotted border-white"
      }
    >
      <h3 className="m-16 mt-48  bg-gradient-to-br from-red-300 to-white bg-clip-text text-center font-Handwriting text-4xl text-transparent  lg:text-8xl">
        Browse Our Images
      </h3>
      <div
        className={
          "max-w-8xl mx-auto mt-20 grid w-full grid-cols-3 items-center divide-gray-900  "
        }
      >
        {homepageGalleryList.map((list) => {
          if (typeof list !== "string") {
            return (
              <div
                key={list.name}
                className="group relative m-0 flex h-[33vh] w-[33vw] justify-center rounded-md  align-middle shadow-xl shadow-black  transition-all duration-300"
              >
                <Image
                  alt={`representative image from ${list.name.replace(
                    "-",
                    " "
                  )}`}
                  layout="fill"
                  // width={1920 / 4}
                  // height={1080 / 4}
                  src={`/frontend-used-images/homepage/homepage-gallery/${list.secondDegCatName}.png`}
                  className={
                    " grayscale-[10%] filter transition-all duration-300 group-hover:grayscale-[80%] "
                  }
                />
                <button
                  className={`absolute top-1/2 left-5 border-b-2 border-white  text-center font-serif text-xl text-red-300  opacity-0 !grayscale-0 !filter transition-all duration-300 hover:text-red-500 group-hover:-translate-y-4 group-hover:opacity-100 lg:text-4xl`}
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
            return <></>;
          }
        })}
      </div>
    </section>
  );
};

export default HomepageGallery;

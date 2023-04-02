import { Masonry } from "@mui/lab";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { isMobile } from "react-device-detect";
import { homepageGalleryList } from "../../constants/homepage/homepageGalleryList";

const HomepageGallery = () => {
  const router = useRouter();
  return (
    <>
      <section
        className={
          "max-w-8xl mx-auto mt-20 grid w-full grid-cols-3 items-center "
        }
      >
        {homepageGalleryList.map((list) => {
          if (typeof list !== "string") {
            return (
              <div
                key={list.name}
                className="group relative m-0 flex h-auto  w-auto justify-center rounded-md  align-middle  shadow-gray-700 drop-shadow-xl transition-all duration-300 "
              >
                <Image
                  alt={`representative image from ${list.name.replace(
                    "-",
                    " "
                  )}`}
                  width={1920 / 4}
                  height={1080 / 4}
                  objectFit={"fill"}
                  src={`/frontend-used-images/homepage/homepage-gallery/${list.secondDegCatName}.png`}
                  className={
                    "grayscale-[10%] filter transition-all duration-300 hover:grayscale-[80%]"
                  }
                />
                <button
                  className={`absolute top-1/2 left-1/2 border-b-2 border-white  text-center font-serif text-xl text-red-300 opacity-0 !grayscale-0 !filter transition-all duration-300 hover:text-red-500 group-hover:-translate-y-4 group-hover:opacity-100`}
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
              <>
                <h3 className="m-16 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-6xl text-transparent drop-shadow-xl">
                  {list}
                </h3>
              </>
            );
          }
        })}
      </section>
    </>
  );
};

export default HomepageGallery;

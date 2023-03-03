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
      <Masonry
        columns={isMobile ? 1 : 3}
        spacing={2}
        defaultColumns={isMobile ? 2 : 4}
        className={"mx-auto mt-20 flex max-w-6xl"}
      >
        {homepageGalleryList.map((list) => {
          if (typeof list !== "string") {
            return (
              <div
                key={list.name}
                className="h- group relative m-0  flex justify-center rounded-md  align-middle  shadow-gray-700 drop-shadow-xl transition-all duration-300 md:m-2 "
              >
                <Image
                  alt={`representative image from ${list.name.replace(
                    "-",
                    " "
                  )}`}
                  width={list.w}
                  height={list.h}
                  objectFit={"scale-down"}
                  src={`/frontend-used-images/homepage/homepage-gallery/${list.subCatName}.png`}
                  className={"grayscale-[90%] filter"}
                />
                <button
                  className={`absolute top-1/2 left-1/2 border-b-2 border-white  text-center font-serif text-xl text-red-300 opacity-0 !grayscale-0 !filter transition-all duration-300 hover:text-red-500 group-hover:-translate-y-4 group-hover:opacity-100`}
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
                <h3 className="m-16 bg-gradient-to-br from-red-300 to-white bg-clip-text font-Handwriting text-6xl text-transparent drop-shadow-xl">
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

export default HomepageGallery;

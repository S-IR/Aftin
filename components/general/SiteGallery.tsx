import React, { FC, useEffect, useMemo, useState } from "react";
import { Masonry } from "@mui/lab";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import PremiumIcon from "./PremiumIcon";
import SingleImage from "./SingleImage";
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import Loading from "./Loading";
import { useInfiniteQuery, useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { config, useSpring, animated } from "react-spring";
import { FirebaseError } from "firebase/app";
import { requestImageDocs } from "../../model/client-side/image-functions/requestImages";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import { auth } from "../../firebase";
import { fetchUserStatus } from "../../model/client-side/general/fetches";
import { User } from "firebase/auth";
import useUserStatus from "../../hooks/useUserStatus";

interface props {
  showSidebar: boolean;
}
const SiteGallery: FC<props> = ({ showSidebar }) => {
  // request image docs code
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);

  // this value is meant to track how many times a person clicked on the 'load more' button. If it reaches 3 it will fire a google tag event and go back to 0
  const [buttonCliclCount, setButtonCliclCount] = useState(0);

  // find the big category name
  const { subCat, ...queryParams } = router.query;
  let category: "advertisement-images" | "graphic-designs" = "graphic-designs";
  if (router.pathname.includes("advertisement-images")) {
    category = "advertisement-images";
  } else if (router.pathname.includes(`graphic-designs`)) {
    category = "graphic-designs";
  }

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<{ docsArray: ImgDoc[]; hasNextPage: boolean }, Error>(
      `${subCat}`,
      ({ pageParam }) =>
        requestImageDocs(pageParam, category, subCat as string, queryParams),
      {
        getNextPageParam: (lastRow, allRows) => {
          if (lastRow && lastRow.hasNextPage) {
            return allRows.length;
          }
        },
        enabled: false,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      }
    );

  //refetch if the query changes
  useEffect(() => {
    refetch();
  }, [router.query]);

  const galleryMarginLeft = useSpring({
    marginLeft: showSidebar ? 216 : 40,
    config: { duration: 300 },
  });

  // login status code

  const { data: loginStatus } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user)
  );

  if (Object.keys(router.query).length === 0) {
    return (
      <h1 className="flex text-center text-white">
        Please select which type of stock image you would like
      </h1>
    );
  }
  if (isLoading || isLoading || !data) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message} </div>;
  }

  const handleDescriptionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key === `Enter`) {
      handleOptionClick(target.value, `description`, router);
    } else {
      return;
    }
  };
  let imgDocs: ImgDoc[] = [];
  data.pages.map((page) => {
    if (!page || !page.docsArray) return;
    return page.docsArray.map((imgDoc) => imgDocs.push(imgDoc));
  });

  // description query variable
  const description = router.query.description;
  return (
    <animated.section
      className={`flex h-auto max-w-screen-lg flex-col items-center  justify-center align-middle `}
      style={galleryMarginLeft}
    >
      <div className="!flex w-full flex-col items-center justify-center align-middle ">
        <input
          type="text"
          onKeyDown={(e) => handleDescriptionEnter(e)}
          placeholder="Describe what you need "
          className="searchbox my-10 !ml-1 h-8  !w-48 !text-center  md:!w-1/2"
          defaultValue={description}
        />
      </div>
      {imgDocs.length !== 0 && loginStatus ? (
        <Masonry
          columns={isMobile ? 1 : 4}
          defaultColumns={4}
          className={"max-w-screen-sm  md:max-w-screen-lg"}
        >
          {imgDocs.map((doc) => (
            <SingleImage
              key={doc.url}
              doc={doc}
              loginStatus={loginStatus}
              isMobile={isMobile}
            />
          ))}
        </Masonry>
      ) : (
        <div className="w-full text-center font-serif text-4xl  ">
          No image fits your applied search filters
        </div>
      )}

      <div className="flex w-full items-center justify-center align-middle">
        <div className="flex h-28 w-full items-center justify-center align-middle">
          {/* if there are no images sent don not render any of the following 2 components  */}
          {data.pages[0] ? (
            hasNextPage ? (
              <button
                className="mx-10 h-10 w-[20vw] justify-center rounded-sm  bg-brown-800 py-2  text-center font-serif    text-white"
                onClick={() => {
                  fetchNextPage();
                  setButtonCliclCount((number) => {
                    window.gtag("event", "siteGallery-load-more-clicked-3x", {
                      subCat: subCat,
                      queryParams: queryParams,
                    });
                    console.log("this ran");
                    return 0;
                  });
                }}
              >
                Load more images
              </button>
            ) : (
              <div className="mx-10 h-10 w-[15vw] justify-center rounded-sm  bg-brown-900/70 py-2  text-center font-serif  text-white/30  text-gray-200 ">
                No more images to load
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </animated.section>
  );
};

export default SiteGallery;

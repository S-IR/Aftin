import React, { FC, useEffect, useState } from "react";
import { Masonry } from "@mui/lab";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/image";
import PremiumIcon from "./PremiumIcon";
import SingleImage from "./SingleImage";
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import Loading from "./Loading";
import { useInfiniteQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { config, useSpring, animated } from "react-spring";
import { FirebaseError } from "firebase/app";
import { requestImageDocs } from "../../model/client-side/image-functions/requestImages";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";
import { ImgDoc } from "../../typings/image-types/ImageTypes";
import { auth } from "../../firebase";

interface props {
  showSidebar: boolean;
}
const SiteGallery: FC<props> = ({ showSidebar }) => {
  // request image docs code
  const router = useRouter();

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
  const [user, userLoading] = useAuthState(auth);
  const [loginStatus, setLoginStatus] = useState<
    null | "not logged in" | "unauthorized" | "bronze" | "silver" | "gold"
  >(null);

  //fetch the user's login status to be sent to each of the image components
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!user) return setLoginStatus("not logged in");
      const token = await user.getIdToken();
      const fetchRes = await fetch(
        `${process.env.NEXT_PUBLIC_server}/api/checkUserStatus`,
        { method: `POST`, body: token }
      ).catch((err: FirebaseError) => console.log(err));
      if (fetchRes === undefined)
        return console.log("response on fetching user status void");
      const { status } = await fetchRes.json();

      setLoginStatus(status);
    };
    fetchUserStatus();
  }, [user]);

  // if there's no query display this text
  if (Object.keys(router.query).length === 0) {
    return (
      <h1 className="flex text-center text-white">
        Please select which type of stock image you would like
      </h1>
    );
  }
  if (isLoading || userLoading || !data) {
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
    <animated.section className={`w-full `} style={galleryMarginLeft}>
      <InfiniteScroll
        dataLength={data?.pages.length * 15}
        next={fetchNextPage}
        hasMore={hasNextPage as boolean}
        loader={<Loading />}
        className={`ml-5 h-auto w-auto max-w-6xl flex-grow items-center justify-center`}
        style={{ overflow: `hidden` }}
      >
        <div className="flex w-full items-center justify-center align-middle">
          <input
            type="text"
            onKeyDown={(e) => handleDescriptionEnter(e)}
            placeholder="Describe what you need "
            className="searchbox my-10 !ml-1 h-8  !w-48 !text-center  md:!w-96"
            defaultValue={description}
          ></input>
        </div>
        {imgDocs.length !== 0 && loginStatus ? (
          <Masonry
            columns={4}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={2}
            className={"max-w-6xl"}
          >
            {imgDocs.map((doc) => (
              <SingleImage key={doc.url} doc={doc} loginStatus={loginStatus} />
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
                <button className="bg-button-svg h-[128px] w-[128px] rounded-full bg-black/40">
                  Load more images
                </button>
              ) : (
                <div className="mx-10 h-[32px] w-96 justify-center rounded   bg-brown-800 py-2 text-center text-xs font-bold  text-gray-200 shadow-md shadow-gray-900/60">
                  No more images to load
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </InfiniteScroll>
    </animated.section>
  );
};

export default SiteGallery;

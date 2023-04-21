import React, { FC, useEffect, useMemo, useState } from "react";
import { Masonry } from "@mui/lab";
import { collection, getDocs, query } from "firebase/firestore";
import Image from "next/legacy/image";
import PremiumIcon from "./PremiumIcon";
import SingleImage from "./SingleImage";
import InfiniteScroll from "react-infinite-scroll-component";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import Loading from "./Loading";
import {
  dehydrate,
  QueryClient,
  useInfiniteQuery,
  useQuery,
} from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { config, useSpring, animated } from "react-spring";
import { FirebaseError } from "firebase/app";
import { requestImageDocs } from "../../model/client-side/image-functions/requestImages";
import { handleOptionClick } from "../../model/client-side/SortingSidebar/handleClick";
import {
  ImgDoc,
  SecondDegreeCategory,
  ThirdDegreeCategory,
} from "../../typings/image-types/ImageTypes";
import { auth } from "../../firebase";
import { fetchUserStatus } from "../../model/client-side/general/fetches";
import { User } from "firebase/auth";
import useUserStatus from "../../hooks/useUserStatus";
import LoginFirstDialog from "./dialog-boxes/LoginFirstDialog";
import { GetServerSideProps } from "next";
import { getImageQueryParams } from "../../model/client-side/image-gallery/getImageQueryParams";
import { useModalStore } from "../../zustand/ModalBoxStore/store";
import FreeImageDialog from "./dialog-boxes/FreeImageDialog";
import PaidImageDialog from "./dialog-boxes/PaidImageDialog";
interface props {
  showSidebar: boolean;
}

export type galleryImageDialog = {
  name: "free" | "login" | "paid";
  imgDoc: ImgDoc | null;
};

const SiteGallery: FC<props> = ({ showSidebar }) => {
  // request image docs code
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);

  const changeModalType = useModalStore((store) => store.CHANGE_MODAL_TYPE);
  // this value is meant to track how many times a person clicked on the 'load more' button. If it reaches 3 it will fire a google tag event and go back to 0
  const [buttonClickCount, setButtonClickCount] = useState(0);

  //used to make modals

  // find the big category name
  const {
    firstDegreeCategory,
    secondDegreeCategory,
    thirdDegreeCategory,
    queryParams,
  } = getImageQueryParams(router);
  const cacheName =
    thirdDegreeCategory === "no-third-category"
      ? secondDegreeCategory
      : `${secondDegreeCategory}/${thirdDegreeCategory}`;
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetched,
  } = useInfiniteQuery<{ docsArray: ImgDoc[]; hasNextPage: boolean }, Error>(
    cacheName,
    ({ pageParam = 0 }) =>
      requestImageDocs(
        pageParam,
        firstDegreeCategory,
        secondDegreeCategory,
        thirdDegreeCategory,
        queryParams
      ),
    {
      getNextPageParam: (lastRow, allRows) => {
        if (lastRow && lastRow.hasNextPage) {
          return allRows.length;
        }
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  //refetch if the query changes
  useEffect(() => {
    if (!loginStatus) return;
    refetch();
  }, [router.query]);

  const galleryMarginLeft = useSpring({
    marginLeft: showSidebar && !isMobile ? 226 : 40,
    config: { duration: 300 },
  });

  // login status code

  const { data: loginStatus, isLoading: loginStatusLoading } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );

  // Dialog popup code

  const [dialog, setDialog] = useState<galleryImageDialog | null>(null);

  //Code to deal with loading and error states
  if (Object.keys(router.query).length === 0) {
    return (
      <h1 className="flex text-center text-white">
        Please select which type of stock image you would like
      </h1>
    );
  }
  if (isLoading || isLoading || !data || !isFetched) {
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

  // description query variable
  const description = router.query.description;
  return (
    <animated.section
      className={` flex h-auto w-full max-w-[80vw]  flex-col items-center  justify-center rounded-sm bg-gray-900/40 p-2 align-middle `}
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
      {data.pages !== undefined &&
      data.pages[0].docsArray.length !== 0 &&
      !loginStatusLoading ? (
        <section
          className={
            " grid  w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1"
          }
        >
          {data.pages.map((page) =>
            page.docsArray.map((imgDoc) => (
              <SingleImage
                key={imgDoc.url}
                imgDoc={imgDoc}
                isMobile={isMobile}
                setDialog={setDialog}
                changeModalType={changeModalType}
              />
            ))
          )}
        </section>
      ) : (
        <div className="w-full text-center font-serif text-4xl  ">
          No image fits your applied search filters
        </div>
      )}

      <div className="flex w-full items-center justify-center align-middle">
        <div className="flex h-28 w-full items-center justify-center align-middle">
          {/* if there are no images sent don not render any of the following 2 components  */}
          {data.pages !== undefined && data.pages[0] ? (
            hasNextPage ? (
              <button
                className="mx-10 h-10 w-[65vw] justify-center rounded-sm bg-brown-800  py-2 text-center  font-serif text-white    md:w-[20vw]"
                onClick={() => {
                  fetchNextPage();
                  setButtonClickCount((number) => {
                    window.gtag("event", "siteGallery-load-more-clicked-3x", {
                      subCat: secondDegreeCategory,
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
              <div className="mx-10 h-10 w-[60vw]  justify-center rounded-sm bg-brown-900/70  py-2 text-center  font-serif text-white/30  text-gray-200  md:w-[15vw] ">
                No more images to load
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </div>

      {dialog !== null && (
        <>
          <LoginFirstDialog
            dialog={dialog}
            setDialog={setDialog}
            imgDoc={dialog.imgDoc as ImgDoc}
          />
          <FreeImageDialog
            doc={dialog.imgDoc as ImgDoc}
            dialogName={dialog.name}
            setDialog={setDialog}
            loginStatus={loginStatus}
            isMobile={isMobile}
          />
          <PaidImageDialog
            doc={dialog.imgDoc as ImgDoc}
            dialog={dialog}
            setDialog={setDialog}
            loginStatus={loginStatus}
          />
        </>
      )}
    </animated.section>
  );
};

export default SiteGallery;

import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useInfiniteQuery, useQuery } from "react-query";
import { requestImageDocs } from "../../../../model/client-side/image-functions/requestImages";
import { useAppDispatch } from "../../../../Redux/hooks";
import {
  GrahicDesignsOptions,
  ImgDoc,
  SMALL_CATEGORY_OF_IMG,
  AdvertImagesOptions,
} from "../../../../typings/image-types/ImageTypes";
import {
  useSpring,
  animated,
  config,
  to,
  AnimatedComponent,
} from "react-spring";
import Loading from "../../../general/Loading";
import PremiumIcon from "../../../general/PremiumIcon";
import PaidImageModal from "../../../general/PaidImageModal";
import { auth } from "../../../../firebase";
import { uploadImageToCanvas } from "../../../../model/client-side/image-editor/Upload";
import SingleImage, { SingleEditorImage } from "../../../general/SingleImage";
import { isMobile } from "react-device-detect";
import { fetchUserStatus } from "../../../../model/client-side/general/fetches";

interface props {
  selectedCategory: { name: string; value: SMALL_CATEGORY_OF_IMG };
  pageId: number | null;
}

const ImageButtonImages = ({ selectedCategory, pageId }: props) => {
  const router = useRouter();

  // handles the hover over the premium image

  const [user, userLoading] = useAuthState(auth);

  const { data: loginStatus } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user)
  );

  //FETCH IMAGE CODE

  const category = useMemo(() => {
    if (AdvertImagesOptions.includes(selectedCategory?.value)) {
      return "advertisement-images";
    } else if (GrahicDesignsOptions.includes(selectedCategory?.value)) {
      return "graphic-designs";
    } else {
      return null;
    }
  }, [selectedCategory?.value]);
  const queryParams = router.query;

  const { data, isLoading, error, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<{ docsArray: ImgDoc[]; hasNextPage: boolean }, Error>(
      `${selectedCategory?.name}`,
      ({ pageParam }) =>
        requestImageDocs(
          pageParam,
          category,
          selectedCategory?.value,
          queryParams
        ),
      {
        getNextPageParam: (lastRow, allRows) => {
          if (lastRow && lastRow.hasNextPage) {
            return allRows.length;
          }
        },
        enabled: Boolean(selectedCategory?.value),
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      }
    );

  //refetch if the query changes
  useEffect(() => {
    refetch();
  }, [router.query]);

  useEffect(() => {
    console.log(`data:`, data);
  }, [data]);

  let imgDocs: ImgDoc[] = [];
  data?.pages.map((page) => {
    if (!page || !page.docsArray) return;
    return page.docsArray.map((imgDoc) => imgDocs.push(imgDoc));
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message} </div>;
  }

  // END OF QUERY IMAGE CODE
  return (
    <>
      <div className="scrollbar  grid  h-max w-full grid-cols-2 items-center  justify-center overflow-x-visible  overflow-y-scroll align-middle shadow-white/40 drop-shadow-md">
        {loginStatus &&
          imgDocs.map((doc, i) => {
            return (
              <SingleEditorImage
                doc={doc}
                isMobile={isMobile}
                loginStatus={loginStatus}
                key={i}
                pageId={pageId as number}
              />
              // <animated.div
              //   onMouseEnter={() => setPremiumText(true)}
              //   onMouseLeave={() => setPremiumText(false)}
              //   key={doc.url}
              //   className="m-4 flex h-[256] w-[256] items-center justify-center align-middle shadow-white drop-shadow-md  "
              // >
              //   <Image
              //     src={doc.url}
              //     width={256}
              //     height={256}
              //     objectFit={"scale-down"}
              //     alt={doc.description}
              //     className={`cursor-pointer `}
              //     onClick={() =>
              //       uploadImageToCanvas(dispatch, undefined, doc.url)
              //     }
              //   />
              //   {doc.tier === `silver` ||
              //     (doc.tier === "gold" && (
              //       <PremiumIcon premiumText={premiumText} />
              //     ))}
              //   {doc.tier === `silver` ||
              //   (doc.tier === "gold" && loginStatus === "bronze") ? (
              //     <PaidImageModal
              //       openDialog={openDialog}
              //       setOpenDialog={setOpenDialog}
              //     />
              //   ) : (
              //     <></>
              //   )}
              // </animated.div>
            );
          })}
      </div>
      <button
        className="my-1 h-8 !w-5/6 rounded-sm border-t-4   border-orange-700 bg-yellow-800   font-Handwriting  text-orange-200  shadow-brown-500 drop-shadow-md  transition-all duration-300   ease-in-out hover:bg-yellow-500 active:shadow-none disabled:bg-yellow-200/80"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        See more images
      </button>
    </>
  );
};

export default ImageButtonImages;

import { FirebaseError } from "firebase/app";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useInfiniteQuery, useQuery } from "react-query";
import { requestImageDocs } from "../../../../model/client-side/image-functions/requestImages";
import {
  GraphicDesignsOptions,
  ImgDoc,
  SecondDegreeCategory,
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
import { auth } from "../../../../firebase";
import { uploadImageToCanvas } from "../../../../model/client-side/image-editor/Upload";
import { SingleEditorImage } from "../../../general/SingleImage";
import { isMobile } from "react-device-detect";
import { fetchUserStatus } from "../../../../model/client-side/general/fetches";
import { useModalStore } from "../../../../zustand/ModalBoxStore/store";
import { galleryImageDialog } from "../../../general/SiteGallery";

interface props {
  selectedCategory: { name: string; value: SecondDegreeCategory };
  pageId: number | null;
}

const ImageButtonImages = ({ selectedCategory, pageId }: props) => {
  const router = useRouter();

  //sets the image dialog boxes depending on the user's interaction with a displayed image
  const [dialog, setDialog] = useState<null | galleryImageDialog>(null);

  ///handles server error modal appearance
  const changeModalType = useModalStore((store) => store.CHANGE_MODAL_TYPE);

  const [user, userLoading] = useAuthState(auth);

  const { data: loginStatus } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user)
  );

  //FETCH IMAGE CODE
  const category = useMemo(() => {
    if (AdvertImagesOptions.includes(selectedCategory?.value)) {
      return "advertisement-images";
    } else {
      return "graphic-designs";
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
          selectedCategory.value,
          "no-third-category",
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
          imgDocs.map((imgDoc, i) => {
            return (
              <SingleEditorImage
                imgDoc={imgDoc}
                isMobile={isMobile}
                loginStatus={loginStatus}
                key={i}
                pageId={pageId as number}
                setDialog={setDialog}
                changeModalType={changeModalType}
              />
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

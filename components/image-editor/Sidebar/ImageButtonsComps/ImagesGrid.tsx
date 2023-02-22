import { FirebaseError } from "firebase/app";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useInfiniteQuery } from "react-query";
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

interface props {
  selectedCategory: { name: string; value: SMALL_CATEGORY_OF_IMG };
}

const ImageButtonImages = ({ selectedCategory }: props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // handles the hover over the premium image
  const [premiumText, setPremiumText] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleImageClick = (
    paid: "bronze" | "silver" | "gold",
    url: string
  ) => {
    if (paid !== "bronze" && loginStatus === "bronze") {
      return;
    }
  };
  //LOGIN STATUS CODE

  const [user, userLoading] = useAuthState(auth);
  const [loginStatus, setLoginStatus] = useState<
    null | "not logged in" | "unauthorized" | "bronze" | "silver" | "gold"
  >(null);

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

  // END LOGIN STATUS CODE

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

  console.log(`loginStatus:`, loginStatus);

  // END OF QUERY IMAGE CODE
  return (
    <>
      <div className="scrollbar grid h-max  w-full grid-cols-2 items-center justify-center  overflow-x-visible overflow-y-scroll  align-middle shadow-white/40 drop-shadow-md">
        {loginStatus &&
          imgDocs.map((doc, i) => {
            return (
              <animated.div
                onMouseEnter={() => setPremiumText(true)}
                onMouseLeave={() => setPremiumText(false)}
                key={doc.url}
                className="m-4 flex h-[256] w-[256] items-center justify-center align-middle shadow-white drop-shadow-md  "
              >
                <Image
                  src={doc.url}
                  width={256}
                  height={256}
                  objectFit={"scale-down"}
                  alt={doc.description}
                  className={`cursor-pointer `}
                  onClick={() =>
                    uploadImageToCanvas(dispatch, undefined, doc.url)
                  }
                />
                {doc.tier === `silver` ||
                  (doc.tier === "gold" && (
                    <PremiumIcon premiumText={premiumText} />
                  ))}
                {doc.tier === `silver` ||
                (doc.tier === "gold" && loginStatus === "bronze") ? (
                  <PaidImageModal
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                  />
                ) : (
                  <></>
                )}
              </animated.div>
            );
          })}
      </div>
      <button
        className="h-16 w-full bg-gray-900 text-center font-serif shadow-white drop-shadow-xl hover:bg-gray-700 "
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        See more images
      </button>
    </>
  );
};

export default ImageButtonImages;

import { QuestionMark } from "@mui/icons-material";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { fetchUserStatus } from "../../model/client-side/general/fetches";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/general/Loading";
import { auth } from "../../firebase";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const Index: NextPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);

  //this variable detects if there's an uploaded image and saves it
  const [imageSize, setImageSize] = useState<null | { w: number; h: number }>(
    null
  );
  const { data: loginStatus, isLoading: loginStatusLoading } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user),
    {
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );

  const onDrop = async <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    if (acceptedFiles.length > 1) return alert("You can only upload 1 image");
    let reader = new FileReader();
    let droppedImage = acceptedFiles[0];
    reader.readAsDataURL(droppedImage);

    const image = new Image();
    image.src = URL.createObjectURL(droppedImage);
    image.onload = () => {
      setImageSize({ w: image.width, h: image.height });
    };
    reader.onload = async () => {
      console.log("fetching...");

      const response = await fetch(`/api/predictions/upscale`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: reader.result,
        }),
      });
      let prediction = await response.json();
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch(
          "/api/predictions/upscale/" + prediction.id
        );
        prediction = await response.json();
        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        console.log({ prediction });
        setPrediction(prediction);
      }
      return "image sent!";
    };
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDragEventsBubbling: true,
    onDrop: onDrop,
  });

  return (
    <section className="flex h-screen w-screen items-center justify-center align-middle">
      <div className="flex h-[85%] w-[85%]    space-y-20 overflow-hidden rounded-lg bg-[url('/frontend-used-images/image-enhancing/imageEnhancingBG.svg')] align-middle drop-shadow-xl ">
        {loginStatusLoading ? (
          <Loading />
        ) : loginStatus === "gold" ? (
          <>
            <section className="flex h-full w-1/4 flex-col  bg-gray-900/20 align-middle">
              <div
                className={` h-20 w-full cursor-pointer border-2 border-dashed border-gray-300 bg-gray-800/20 transition-all duration-300 hover:bg-gray-400/20 ${
                  isDragActive ? `bg-red-500/20` : ` bg-gray-800/20`
                }`}
                {...getRootProps({})}
              >
                <div className=" flex h-full flex-col items-center justify-center space-y-2 align-middle">
                  <UploadFileIcon className="h-4 w-4 " />

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Upload Image
                  </p>
                </div>
                <input
                  {...getInputProps({
                    id: "dropzone-file",
                    type: "file",
                    className: "hidden",
                  })}
                />
              </div>
            </section>
            {imageSize && (
              <div className="h-8 w-full bg-gray-800">
                <p className="text-lg text-white">
                  Width : {imageSize.w} | Height : {imageSize.h}{" "}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-center font-Handwriting text-2xl md:text-4xl">
              You require gold tier to access this page <br></br>
              <Link href={"/subscribe?tier=gold"} className={"buttons-3"}>
                <a>
                  <p className="mt-4 underline decoration-yellow-600 transition-all duration-300 hover:decoration-yellow-300 md:mt-10">
                    {" "}
                    Unlock <span className="text-yellow-300">gold</span> tier
                  </p>
                </a>
              </Link>
            </h1>
          </>
        )}
      </div>
    </section>
  );
};

export default Index;

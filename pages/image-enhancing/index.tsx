import { QuestionMark } from "@mui/icons-material";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Loading from "../../components/general/Loading";
import { auth } from "../../firebase";
import { fetchUserStatus } from "../../model/client-side/general/fetches";
import { useUserTier } from "../../hooks/useUserTier";

const Index: NextPage = () => {
  const [user, userLoading] = useAuthState(auth);

  const loginStatus = useUserTier(user, userLoading);

  return (
    <section className="flex h-screen w-screen items-center justify-center align-middle">
      <div className="flex h-[85%] w-[85%]  flex-col items-center justify-center space-y-20 overflow-hidden rounded-lg bg-[url('/image-enhancing/imageEnhancingBG.svg')] align-middle drop-shadow-xl ">
        {loginStatus ? (
          <Loading />
        ) : loginStatus === "gold" || loginStatus === "silver" ? (
          <>
            <h1 className="0 bg-gradient-to-br from-red-300 to-white bg-clip-text text-center font-Handwriting text-2xl text-transparent md:text-4xl">
              What do you want to do to a particular image?
            </h1>
            <div className=" flex  h-16 w-3/4 flex-col items-center  justify-center rounded-sm border-2 border-black/20 bg-gradient-to-r from-yellow-800 to-orange-900 text-center align-middle font-Handwriting text-xl drop-shadow-xl transition-all duration-300 hover:text-red-200 md:w-1/2  ">
              <Link href={"/image-enhancing/upscale"}>Increase Resolution</Link>

              <Link
                href={"/image-enhancing/deblur"}
                className=" flex h-16 w-3/4  items-center justify-center rounded-sm border-2 border-black/20 bg-gradient-to-r from-yellow-800 to-orange-900 align-middle font-Handwriting text-xl transition-all duration-300 hover:text-red-200 md:w-1/2"
              >
                Deblur
              </Link>
            </div>
            <div className="flex w-full flex-col">
              <p className="w-full text-center text-sm">
                Keep in mind that these enhancing techniques are done by AI
                models. that are not owned by us
              </p>
              <Link
                href={"/policies/AI-use"}
                className="buttons-3 h-auto w-auto cursor-pointer"
              >
                Find out more
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center font-Handwriting text-2xl md:text-4xl">
              You require silver or gold tier to access this page <br></br>
              <Link
                href={"/subscribe?tier=silver"}
                className={"buttons-3"}
                legacyBehavior
              >
                <p className="mt-4 underline decoration-yellow-600 transition-all duration-300 hover:decoration-yellow-300 md:mt-10">
                  {" "}
                  Unlock <span className="text-yellow-300">
                    silver | gold
                  </span>{" "}
                  tier
                </p>
              </Link>
            </h1>
          </>
        )}
      </div>
    </section>
  );
};

export default Index;

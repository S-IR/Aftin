import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAuthThirdParty from "../../hooks/useAuthThirdParty";
import { useRouter } from "next/router";
import { FacebookRounded } from "@mui/icons-material";
import FacebookButton from "./FacebookButton";
import { useAuthState, useSignInWithFacebook } from "react-firebase-hooks/auth";
import { GoogleButton } from ".";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../firebase";
import Loading from "../general/Loading";
import { determineModalError } from "../../model/client-side/login/errors";
import AuthErrorDialogue from "../general/modal-boxes/AuthErrorModal";
import { ThirdPartiesSchema } from "../../constants/login/ThirdParties";
import { authResponseType } from "../../constants/login/types";
import { User } from "firebase/auth";
import { useModalStore } from "../../zustand/ModalBoxStore/store";
import PinterestButton from "./PinterestButton";
import LoadingScreen from "../general/LoadingScreen";

interface props {
  user: User | null | undefined;
  userLoading: boolean;
}

interface Inputs {
  email: string;
  password: string;
}
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/**
 * Meant to appear in the login page. Gives login input fields for first and third party accounts
 * @param param0
 * @returns
 */
const LoginDiv = ({ user, userLoading }: props) => {
  const router = useRouter();

  //handles error modal appearance
  const [changeModalText, changeModalType] = useModalStore((state) => [
    state.CHANGE_MODAL_TEXT,
    state.CHANGE_MODAL_TYPE,
  ]);

  const [signUp, signIn, logout, loading] = useAuth();
  const [authWithGoogle, authWithFacebook, authWithPinterest] =
    useAuthThirdParty();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const res = await signIn(email, password);
    if (res?.status === "error") {
      return determineModalError(res.error, changeModalText, changeModalType);
    } else {
      return router.push("/");
    }
  };

  const handleThirdPartySubmit = async (
    name: z.infer<typeof ThirdPartiesSchema>
  ) => {
    let res: authResponseType;
    switch (name) {
      case "Google":
        res = await authWithGoogle();
        if (res.status === "success") {
          return router.push("/");
        } else {
          return determineModalError(
            res.error,
            changeModalText,
            changeModalType
          );
        }
      case "Facebook":
        res = await authWithFacebook();
        if (res.status === "success") {
          return router.push("/");
        } else {
          return determineModalError(
            res.error,
            changeModalText,
            changeModalType
          );
        }
      case "Pinterest":
        res = await authWithPinterest();
    }
  };

  if (userLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  //if the user doesn't exist , has not been loaded , there is a login happening or he has not confirmed his email

  if (user === undefined || user === null || loading || !user.emailVerified) {
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-50 row-span-1 mx-10 flex  h-auto min-h-[90vh]  flex-col items-center   space-y-10  rounded-md p-4 align-middle text-white sm:w-auto md:px-4 "
        >
          <div className="mt-10 flex w-full flex-col items-center justify-center  space-y-10 align-middle font-serif">
            <label className="flex w-full flex-col items-center  justify-center align-middle ">
              <input
                type="email"
                placeholder="Email"
                className=" h-16 w-full rounded-md bg-yellow-500 text-center text-xl shadow-xl  !outline-none drop-shadow-xl transition-all duration-300 placeholder:font-Handwriting placeholder:text-yellow-800 focus:bg-gray-600  focus:placeholder:text-gray-400  active:drop-shadow-none  md:text-2xl "
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] text-orange-500">
                  Please enter a valid email
                </p>
              )}
            </label>
            {/* In order to keep the forgot password button next to the password input I've included both of them in a div */}
            <div className="flex w-full flex-col items-center justify-start space-y-2 align-middle">
              <label className="flex w-full flex-col items-center  justify-center align-middle">
                <input
                  type="password"
                  placeholder="Password"
                  className="h-16 w-full rounded-md bg-yellow-500 text-center text-xl shadow-xl  !outline-none drop-shadow-xl transition-all duration-300 placeholder:font-Handwriting placeholder:text-yellow-800 focus:bg-gray-600  focus:placeholder:text-gray-400  active:drop-shadow-none  md:text-2xl"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && (
                  <p className="p-1 text-xs text-orange-500 md:text-sm">
                    Please enter a valid password
                  </p>
                )}
              </label>
              <button
                type="button"
                className=" w-auto  text-center  text-lg text-gray-800 transition-all duration-300 hover:text-red-500"
                onClick={() => router.push("/reset/password")}
              >
                Forgot Password?
              </button>
            </div>
          </div>
          <div className="mt-10 flex h-min w-full flex-col items-center justify-center space-y-8 ">
            <button
              type="submit"
              className="!m-0 h-12 w-3/4 rounded-sm bg-yellow-600 font-Handwriting text-xl shadow-sm shadow-black transition-all duration-300 hover:bg-gray-800 "
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-10  mb-12 flex h-auto  w-full  flex-col   items-center justify-center space-y-4 text-center align-middle  ">
          <GoogleButton
            text="Login with Google"
            onClick={() => handleThirdPartySubmit("Google")}
          />
          <FacebookButton
            text={"Login with Facebook"}
            onClick={() => handleThirdPartySubmit("Facebook")}
          />
          <PinterestButton
            text={"Login with Pinterest"}
            onClick={() => handleThirdPartySubmit("Pinterest")}
          />
        </div>
        <LoadingScreen isLoading={loading} />
      </>
    );
  } else {
    return (
      <div className=" flex h-full w-full items-center justify-center align-middle">
        <button
          onClick={logout}
          className=" h-10  w-80 bg-red-900 transition-all duration-300 hover:bg-red-800"
        >
          Logout First
        </button>
        <LoadingScreen isLoading={loading} />
      </div>
    );
  }
};

export default LoginDiv;

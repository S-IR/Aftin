import React, { useState } from "react";
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

const LoginDiv = ({ user, userLoading }: props) => {
  const [changeModalText, changeModalType] = useModalStore((state) => [
    state.CHANGE_MODAL_TEXT,
    state.CHANGE_MODAL_TYPE,
  ]);

  const { authWithGoogle, authWithFacebook } = useAuthThirdParty();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const [signUp, signIn, logout, loading] = useAuth();

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
    }
  };

  if (userLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (user === undefined || user === null) {
    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-50 row-span-1 mx-auto flex-row  items-center justify-center   space-y-8 rounded-md  p-4 text-white sm:w-auto md:px-14"
        >
          <div className="flex w-full flex-col items-center justify-center   space-y-20 ">
            <div className="mt-10 flex w-full flex-col items-center justify-center  space-y-10 align-middle font-serif">
              <label className="flex w-auto flex-col items-center  justify-center align-middle ">
                <input
                  type="email"
                  placeholder="Email"
                  className=" white/25 h-8 w-64 bg-[#3A0602] text-center text-xl  shadow-xl !outline-none drop-shadow-xl transition-all duration-300 placeholder:text-orange-700 focus:bg-orange-800  focus:placeholder:text-orange-500  active:drop-shadow-none md:w-80 md:text-2xl "
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
              <div className="flex flex-col items-center justify-start space-y-2 align-middle">
                <label className="flex w-auto flex-col items-center  justify-center align-middle">
                  <input
                    type="password"
                    placeholder="Password"
                    className="white/25 h-8 w-64 bg-[#3A0602] text-center text-xl  shadow-xl !outline-none drop-shadow-xl transition-all duration-300 placeholder:text-orange-700 focus:bg-orange-800  focus:placeholder:text-orange-500  active:drop-shadow-none md:w-80 md:text-2xl"
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
                  className=" w-full  text-center  text-lg text-orange-700 transition-all duration-300 hover:text-orange-300"
                  onClick={() => router.push("/reset")}
                >
                  Forgot Password?
                </button>
              </div>
            </div>
            <div className="mt-10 flex h-min w-1/2 flex-col items-center justify-center space-y-8 ">
              <button
                type="submit"
                className="!m-0 h-10 w-64 bg-red-900 transition-all duration-300 hover:bg-red-800 md:w-80"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
        <div className=" flex w-auto flex-col items-center  justify-center   text-center align-middle md:flex-row md:space-x-12">
          <GoogleButton
            text="Login with Google"
            onClick={() => handleThirdPartySubmit("Google")}
          />
          <FacebookButton
            text={"Login with Facebook"}
            onClick={() => handleThirdPartySubmit("Facebook")}
          />
        </div>
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
      </div>
    );
  }
};

export default LoginDiv;

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAuthThirdParty from "../../hooks/useAuthThirdParty";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import LoadingComp from "../general/Loading";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { FacebookButton, GoogleButton } from ".";
import Box from "@mui/material/Box";
import AuthErrorDialogue from "../general/modal-boxes/AuthErrorModal";
import { ThirdPartiesSchema } from "../../constants/login/ThirdParties";
import { useRouter } from "next/router";
import { User, UserCredential } from "firebase/auth";
import { authResponseType } from "../../constants/login/types";
import PinterestButton from "./PinterestButton";
import { useModalStore } from "../../zustand/ModalBoxStore/store";
import { determineModalError } from "../../model/client-side/login/errors";
import LoadingScreen from "../general/LoadingScreen";

interface props {
  user: User | null | undefined;
  userLoading: boolean;
}
const signUpSchema = z
  .object({
    username: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    //ignore ts
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
const SignUpDiv = ({ user, userLoading }: props) => {
  const router = useRouter();

  type Inputs = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [changeModalText, changeModalType] = useModalStore((state) => [
    state.CHANGE_MODAL_TEXT,
    state.CHANGE_MODAL_TYPE,
  ]);

  const [authWithGoogle, authWithFacebook] = useAuthThirdParty();
  const [signUp, signIn, logout, loading] = useAuth();

  //state that saves the user email in order to display it in the modal that will appear after successfully sending the confirm email
  const [userMail, setUserMail] = useState<string>("your email");

  //makes a modal appear with the confirm email text
  const handleConfirmEmailModal = () => {
    changeModalText({
      title: "Verify your Email",
      text: `A verification email has been set to ${userMail}.<br></br>
    Please check your email inbox. You should find an email from us that contains a verification  link.<br></br> Click on that link to confirm your account and to be redirected to our homepage`,
    });
    changeModalType("generic-success");
  };
  const onSubmit: SubmitHandler<Inputs> = async ({
    username,
    email,
    password,
  }) => {
    setUserMail(email);
    const res = await signUp(email, password, username);
    if (res?.status === "success") {
      return handleConfirmEmailModal();
    } else {
      return determineModalError(res.error, changeModalText, changeModalType);
    }
  };

  const handleGoogleSubmit = async () => {
    const res = await authWithGoogle();
    if (res.status === "success" && res.isNewUser === true) {
      setUserMail(res.user.email as string);
      return handleConfirmEmailModal();
    } else if (res.status === "success" && res.isNewUser === false) {
      return router.push("/");
    } else if (res.status === "error") {
      return determineModalError(res.error, changeModalText, changeModalType);
    }
  };
  const handleFacebookSubmit = async () => {
    const res = await authWithFacebook();
    if (res.status === "success") {
    } else {
      return determineModalError(res.error, changeModalText, changeModalType);
    }
  };
  // useEffect(() => {
  //   handleConfirmEmailModal();
  // }, []);

  //if the user is loading (meaning it hasn't yet been fetched) this component will display a loading spinner instead of a full screen spinner in the case of loading due to sign up
  if (userLoading) {
    return <LoadingComp />;
  }

  //if the user doesn't exist , has not been loaded , there is a sign up happening or he has not confirmed his email
  if (user === undefined || user === null || loading || !user.emailVerified) {
    return (
      <section className="flex h-auto w-full flex-col items-center pb-5 align-middle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full flex-col items-center justify-center space-y-6 border-red-900 pl-2 pb-2 text-center align-top shadow-md shadow-black "
        >
          <h3 className="mb-8 mt-4  text-center font-Handwriting  text-4xl">
            Email Sign Up
          </h3>

          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Username"
              className="text-md h-10 w-56 rounded-md bg-yellow-500  text-center shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-yellow-800 focus:bg-gray-600 focus:placeholder:text-gray-400 active:drop-shadow-none md:w-80 md:text-lg"
              {...register("username")}
            />
            {errors.username && (
              <p className=" h-min text-sm text-orange-500">
                Please enter a valid username
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="text-md h-10 w-56 rounded-md bg-yellow-500  text-center shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-yellow-800 focus:bg-gray-600 focus:placeholder:text-gray-400 active:drop-shadow-none md:w-80 md:text-lg"
              {...register("email")}
            />
            {errors.email && (
              <p className=" text-[13px] text-orange-500">
                Please enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="text-md h-10 w-56 rounded-md bg-yellow-500  text-center shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-yellow-800 focus:bg-gray-600 focus:placeholder:text-gray-400 active:drop-shadow-none md:w-80 md:text-lg"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-[13px] text-orange-500">
                Please enter a valid password
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="text-md h-10 w-56 rounded-md bg-yellow-500  text-center shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-yellow-800 focus:bg-gray-600 focus:placeholder:text-gray-400 active:drop-shadow-none md:w-80 md:text-lg"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className=" text-[13px] text-orange-500">
                Passwords do not match
              </p>
            )}
          </label>
          <button
            type="submit"
            className="!mt-16  h-10 w-2/4 bg-yellow-600  transition-all duration-300 hover:hover:bg-gray-800 "
          >
            Sign Up
          </button>
        </form>
        <div className="my-4 flex h-auto w-full flex-col items-center justify-center  space-y-4 pl-2 pb-5  text-center align-middle">
          <h3 className="  w-full text-center font-Handwriting text-4xl ">
            3rd Party Sign Up
          </h3>
          <div className="mx-2  flex h-auto w-full grow flex-col items-center justify-center space-y-2  align-middle ">
            <GoogleButton
              text={"Sign up with Google"}
              h={"sm"}
              onClick={() => handleGoogleSubmit()}
            />
            <FacebookButton
              text={"Sign up with Facebook"}
              h={"sm"}
              onClick={() => handleFacebookSubmit()}
            />
            <PinterestButton
              text={"Sign up with Pinterest"}
              h={"sm"}
              onClick={() => handleFacebookSubmit()}
            />
          </div>
        </div>
        <LoadingScreen isLoading={loading} />
      </section>
    );
  } else {
    return (
      <div className=" flex h-full w-full items-center justify-center align-middle">
        <button
          onClick={logout}
          className=" h-10  w-56 bg-red-900 transition-all duration-300 hover:bg-red-800 md:w-80  "
        >
          Logout First
        </button>
      </div>
    );
  }
};

export default SignUpDiv;

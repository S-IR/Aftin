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
import AuthErrorDialogue from "../general/dialog-boxes/AuthErrorDialogue";
import { determineDialogError } from "../../model/client-side/login/errors";
import { ThirdPartiesSchema } from "../../constants/login/ThirdParties";
import { useRouter } from "next/router";
import { User, UserCredential } from "firebase/auth";
import { authResponseType } from "../../constants/login/types";

interface props {
  user: User | null | undefined;
  userLoading: boolean;
}

const SignUpDiv = ({ user, userLoading }: props) => {
  const router = useRouter();

  const signUpSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),

    email: z.string().email(),
  });

  type Inputs = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const [signUp, signIn, logout, loading] = useAuth();
  const { authWithGoogle, authWithFacebook } = useAuthThirdParty();

  const [userMail, setUserMail] = useState<string>("your email");
  const [openEmail, setOpenEmail] = useState<boolean>(false);

  const [dialogError, setDialogError] = useState<null | {
    title: string | JSX.Element;
    content: string | JSX.Element;
  }>(null);

  const onSubmit: SubmitHandler<Inputs> = async ({
    username,
    email,
    password,
  }) => {
    setUserMail(email);
    const res = await signUp(email, password, username);
    if (res?.status === "success") {
      setOpenEmail(true);
      return;
    } else {
      return determineDialogError(res.error, setDialogError);
    }
  };

  const handleGoogleSubmit = async () => {
    const res = await authWithGoogle();
    if (res.status === "success" && res.isNewUser === true) {
      console.log("we are here");
      setUserMail(res.user.email as string);
      setOpenEmail(true);
    } else if (res.status === "success" && res.isNewUser === false) {
      return router.push("/");
    } else if (res.status === "error") {
      return determineDialogError(res.error, setDialogError);
    }
  };
  const handleFacebookSubmit = async () => {
    const res = await authWithFacebook();
    if (res.status === "success") {
    } else {
      return determineDialogError(res.error, setDialogError);
    }
  };
  if (loading) {
    return <LoadingComp />;
  }
  if (openEmail) {
    return (
      <div className="bg-red-200">
        <h2 className="my-4  border-b-2 border-black text-center font-serif !text-6xl text-black">
          <p className="font-Handwriting">{"Verify your email"}</p>
        </h2>
        <div className="my-4 text-black ">
          <h4 id="alert-dialog-slide-description">
            <p className="text-center text-black">
              {` A verification email has been set to ${userMail}  `}
              <br></br>
              {`check your email box and click the verification link that has been sent in order to verify your account. That link will send you to the homepage`}
            </p>
          </h4>
        </div>
      </div>
    );
  }
  if (user === undefined || (user === null && !userLoading)) {
    return (
      <>
        <section className="flex h-full w-full  flex-col md:flex-row">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-full flex-col items-center justify-center space-y-6 border-red-900 pl-2 text-center align-top md:w-1/2 md:pl-10   "
          >
            <h2 className="mb-8 mt-4  text-center text-xl md:text-2xl">
              Email Sign Up
            </h2>

            <label className="inline-block w-full">
              <input
                type="text"
                placeholder="Username"
                className=" text-md h-10 w-56 bg-[#3A0602] text-center  shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white focus:bg-orange-800 focus:placeholder:text-orange-500/50    active:drop-shadow-none md:w-80 md:text-lg  "
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
                className="text-md h-10 w-56 bg-[#3A0602] text-center  shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white focus:bg-orange-800 focus:placeholder:text-orange-500/50    active:drop-shadow-none md:w-80 md:text-lg"
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
                className="text-md h-10 w-56 bg-[#3A0602] text-center  shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white focus:bg-orange-800 focus:placeholder:text-orange-500/50    active:drop-shadow-none md:w-80 md:text-lg"
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
                className="text-md h-10 w-56 bg-[#3A0602] text-center  shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white focus:bg-orange-800 focus:placeholder:text-orange-500/50    active:drop-shadow-none md:w-80 md:text-lg"
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
              className="!mt-16  h-10 w-56 bg-orange-900 transition-all duration-300 hover:bg-orange-800 md:w-80"
            >
              Sign Up
            </button>
          </form>
          <div className="items-top w-full flex-col justify-center space-y-6 pl-2 text-center align-middle md:w-1/2 md:pl-10 ">
            <h2 className="mb-8 mt-4 text-xl md:text-2xl">3rd Party Sign Up</h2>
            <div className="flex h-[60%] w-full grow flex-col items-center justify-center space-y-0  align-middle  md:space-y-8">
              <GoogleButton
                text={"Sign up with Google"}
                onClick={() => handleGoogleSubmit()}
              />
              <FacebookButton
                text={"Sign up with Facebook"}
                onClick={() => handleFacebookSubmit()}
              />
            </div>
          </div>
        </section>

        {dialogError !== null && (
          <AuthErrorDialogue
            dialogError={dialogError}
            setDialogError={setDialogError}
          />
        )}
      </>
    );
  } else {
    return (
      <div className=" flex h-full w-full items-center justify-center align-middle">
        <button
          onClick={logout}
          className=" h-10  w-56 bg-red-900 transition-all duration-300 hover:bg-red-800 md:w-80"
        >
          Logout First
        </button>
      </div>
    );
  }
};

export default SignUpDiv;

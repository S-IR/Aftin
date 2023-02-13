import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAuthThirdParty from "../../hooks/useAuthThirdParty";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Loading from "../general/Loading";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { FacebookButton, GoogleButton } from ".";

function SignUpDiv() {
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

  const { signUp, loading } = useAuth();
  const { signUpWithGoogle, signUpWithFacebook } = useAuthThirdParty();

  const [userMail, setUserMail] = useState<string>("");
  const [openEmail, setOpenEmail] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = async ({
    username,
    email,
    password,
  }) => {
    setUserMail(email);
    const res = await signUp(email, password, username);
    if (res?.status === 200) return setOpenEmail(true);
  };

  return (
    <>
      <section className="flex h-full w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 flex-col items-center justify-center space-y-4  border-red-900 pl-10 text-center align-top   "
        >
          <h2 className="mb-8 mt-4  text-center text-2xl">Email Sign Up</h2>

          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Username"
              className=" h-10 w-80 bg-[#3A0602]   text-center text-lg shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white    focus:bg-orange-800 focus:placeholder:text-orange-500/50 active:drop-shadow-none  "
              {...register("username")}
            />
            {errors.username && (
              <p className="p-1 text-[13px] text-orange-500">
                Please enter a valid username
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="h-10 w-80 bg-[#3A0602]   text-center text-lg shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white    focus:bg-orange-800 focus:placeholder:text-orange-500/50 active:drop-shadow-none"
              {...register("email")}
            />
            {errors.email && (
              <p className="p-1 text-[13px] text-orange-500">
                Please enter a valid email
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="h-10 w-80 bg-[#3A0602]   text-center text-lg shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white    focus:bg-orange-800 focus:placeholder:text-orange-500/50 active:drop-shadow-none"
              {...register("password")}
            />
            {errors.password && (
              <p className="p-1 text-[13px] text-orange-500">
                Please enter a valid password
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-10 w-80 bg-[#3A0602]   text-center text-lg shadow-xl !outline-none drop-shadow-[10px_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 placeholder:text-white    focus:bg-orange-800 focus:placeholder:text-orange-500/50 active:drop-shadow-none"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="p-1 text-[13px] text-orange-500">
                Passwords do not match
              </p>
            )}
          </label>
          <button
            type="submit"
            className="!mt-16  h-10 w-80 bg-orange-900 transition-all duration-300 hover:bg-orange-800"
          >
            Sign Up
          </button>
        </form>
        <div className="items-top w-1/2 flex-col justify-center space-y-6 pl-10 text-center align-middle ">
          <h2 className="mb-8 mt-4  text-2xl">3rd Party Sign Up</h2>
          <div className="flex h-[60%] w-full grow flex-col items-center justify-center space-y-8  align-middle">
            <GoogleButton
              text={"Sign up with Google"}
              onClick={signUpWithGoogle}
              w={"lg"}
            />
            <FacebookButton
              text={"Sign up with Facebook"}
              onClick={signUpWithFacebook}
              w={"lg"}
            />
          </div>
        </div>
      </section>

      {loading && (
        <div className="absolute h-screen w-screen">
          <Loading />
        </div>
      )}

      <Dialog
        open={openEmail}
        keepMounted
        onClose={() => setOpenEmail(false)}
        aria-describedby="alert-dialog-slide-description"
        className="bg-gray-500/40"
      >
        <DialogTitle className="">{"Verify your email"}</DialogTitle>
        <DialogContent className="bg-black ">
          <DialogContentText id="alert-dialog-slide-description">
            <p className="text-white">
              {` A verification email has been set to ${userMail}  `}
              <br></br>
              {`check your email box and click the verification link that has been sent in order to verify your account. That link will send you to the Frontpage`}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default SignUpDiv;

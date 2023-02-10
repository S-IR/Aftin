import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoogleButton from "react-google-button";
import useAuthThirdParty from "../../hooks/useAuthThirdParty";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Loading from "../general/Loading";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

function SignUpDiv() {
  const signUpSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),

    email: z.string().email(),
    occupation: z.enum([
      "Graphic Designer",
      "Business Owner",
      "Hobbyist",
      "Student",
      "Not Specified",
    ]),
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
  const { signUpWithGoogle } = useAuthThirdParty();

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-50 row-span-1 mx-auto flex-row  items-center justify-center space-y-8 rounded-md bg-gray-200 to-blue-900 p-4 text-white sm:w-auto "
      >
        <div className="flex flex-col space-y-4 text-center">
          <div className="flex flex-col items-center text-center align-middle">
            <GoogleButton
              label="Sign Up  with Google"
              onClick={signUpWithGoogle}
            />
            <button onClick={signUpWithGoogle}>
              {" "}
              FUTURE FACEBOOK LOGIN BUTTON
            </button>
          </div>
          <label className="inline-block w-full">
            <input
              type="text"
              placeholder="Username"
              className="input"
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
              className="input"
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
              className="input"
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
              className="input"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="p-1 text-[13px] text-orange-500">
                Passwords do not match
              </p>
            )}
          </label>
          <p className="justify-center text-black">
            Optional : Tell us your occupation
          </p>
          <label className="inline-block w-full">
            <select className="input" {...register("occupation")}>
              <option value="Graphic Designer">Graphic Designe</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Hobbyist">Hobbyist</option>
              <option value="Student">Student</option>
              <option value="Not Specified" selected>
                Not Specified
              </option>
            </select>
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="general-buttons !m-0">
            Sign Up
          </button>
        </div>
      </form>
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

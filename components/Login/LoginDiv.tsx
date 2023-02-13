import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAuthThirdParty from "../../hooks/useAuthThirdParty";
import { useRouter } from "next/router";
import { FacebookRounded } from "@mui/icons-material";
import FacebookButton from "./FacebookButton";
import { useSignInWithFacebook } from "react-firebase-hooks/auth";
import { GoogleButton } from ".";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Inputs {
  email: string;
  password: string;
}
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginDiv() {
  const { signInWithGoogle, signInWithFacebook } = useAuthThirdParty();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-50 row-span-1 mx-auto flex-row  items-center justify-center   space-y-8 rounded-md  p-4 text-white sm:w-auto md:px-14"
    >
      <div className="flex w-full flex-col items-center justify-center   space-y-20 ">
        <div className="mt-10 flex w-full flex-col items-center justify-center  space-y-10 align-middle font-serif">
          <label className="inline-block w-auto  focus:border-none active:border-none ">
            <input
              type="email"
              placeholder="Email"
              className=" white/25 h-8 w-80 bg-[#3A0602]   text-center text-2xl shadow-xl !outline-none drop-shadow-xl transition-all duration-300  placeholder:text-orange-700  focus:bg-orange-800 focus:placeholder:text-orange-500 active:drop-shadow-none "
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
            <label className="inline-block w-auto">
              <input
                type="password"
                placeholder="Password"
                className="white/25 h-8 w-80 bg-[#3A0602]   text-center text-2xl shadow-xl !outline-none drop-shadow-xl transition-all duration-300  placeholder:text-orange-700  focus:bg-orange-800 focus:placeholder:text-orange-500 active:drop-shadow-none"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.email && (
                <p className="p-1 text-[13px] text-orange-500">
                  Please enter a valid email
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
            className="!m-0 h-10 w-80 bg-red-900 transition-all duration-300 hover:bg-red-800"
          >
            Sign In
          </button>
          <div className=" flex w-auto  items-center justify-center space-x-12 text-center align-middle">
            <GoogleButton text="Login with Google" onClick={signInWithGoogle} />
            <FacebookButton
              text={"Login with Facebook"}
              onClick={signInWithFacebook}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginDiv;

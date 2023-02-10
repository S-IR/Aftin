import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import GoogleButton from "react-google-button";
import useAuthThirdParty from "../../hooks/useAuthThirdParty";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
  password: string;
}

function LoginDiv() {
  const { signInWithGoogle } = useAuthThirdParty();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await signIn(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-50 row-span-1 mx-auto flex-row  items-center justify-center   space-y-8 rounded-md bg-gray-200 to-blue-900 p-4 text-white sm:w-auto md:px-14"
    >
      <div className="w-full space-y-4">
        <label className="inline-block w-full">
          <input
            type="email"
            placeholder="Email"
            className="input"
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
        <label className="inline-block w-full">
          <input
            type="password"
            placeholder="Password"
            className="input"
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
        <div className="flex flex-col items-center text-center align-middle">
          <GoogleButton label="Login with Google" onClick={signInWithGoogle} />
        </div>
        <button
          type="button"
          className="ml-auto w-full  text-right text-blue-700"
          onClick={() => router.push("/reset")}
        >
          Forgot Password?
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button type="submit" className="general-buttons !m-0">
          Sign In
        </button>
      </div>
    </form>
  );
}

export default LoginDiv;

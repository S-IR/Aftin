import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPassword } from "../../../model/server-side/sendEmail";
import { NextSeo } from "next-seo";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
}

const Index = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);
  if (user === undefined && !userLoading) {
    router.push("/");
  }

  const [statusOfMail, setStatusOfMail] = useState<
    | null
    | "If the email you've provided is of a real user account then a reset password mail with further instructions will be sent to your email address"
  >(null);

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    const res = await resetPassword(email);
    console.log("reset password res: ", res);

    if (res.status === 500)
      return alert(
        "There was an internal server error, please try again later"
      );
    setStatusOfMail(
      "If the email you've provided is of a real user account then a reset password mail with further instructions will be sent to your email address"
    );
  };
  return (
    <div className="flex h-screen w-screen justify-center ">
      {/* <NextSeo title="Reset Password" /> */}
      <section className="my-10 flex h-3/4 w-3/4 flex-col items-center justify-center rounded-md bg-opacity-75 bg-[url('/reset/bg.png')] bg-cover p-4 align-middle">
        <h1 className="mx-auto my-4 font-Handwriting text-4xl text-orange-200 lg:text-6xl">
          Forgot your password?
        </h1>
        <h2 className="mx-auto text-xl text-gray-400">
          {" "}
          Please enter your email address :
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            "flex flex-col items-center justify-center space-y-20 align-middle"
          }
        >
          <label className="0 mt-10 inline-block ">
            <input
              type="email"
              placeholder="Email"
              className="h-8 w-80 bg-orange-800 text-center text-xl shadow-xl !outline-none drop-shadow-xl transition-all duration-300  placeholder:text-orange-400  focus:bg-orange-800 focus:placeholder:text-orange-500 active:drop-shadow-none"
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
          <button
            type="submit"
            className="buttons-1 !mx-0 h-8 w-32 !bg-orange-500 text-center"
          >
            Submit
          </button>
          {statusOfMail && <p className="text-2xl">{statusOfMail}</p>}
        </form>
      </section>
    </div>
  );
};

export default Index;

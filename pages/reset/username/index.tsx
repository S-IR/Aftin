import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../../firebase";
import { changeUsername } from "../../../model/server-side/sendEmail";
import { useModalStore } from "../../../zustand/ModalBoxStore/store";

interface Inputs {
  newUsername: string;
}

const Index = () => {
  const [changeModalText, changeModalType] = useModalStore((store) => [
    store.CHANGE_MODAL_TEXT,
    store.CHANGE_MODAL_TYPE,
  ]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const [user, userLoading] = useAuthState(auth);

  if (!user && !userLoading) return router.push("/");
  const onSubmit: SubmitHandler<Inputs> = async ({ newUsername }) => {
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_server}/api/changeUsername`,
      { method: `POST`, body: token }
    );
    switch (res.status) {
      case 500:
        return changeModalType("server-error");
      case 401:
        changeModalText({
          title: "Session has Expired",
          text: "Your session token has expired. Please log in again",
        });
        return changeModalType("generic-error");
      default:
        updateProfile(user, {
          displayName: newUsername,
        });
        changeModalText({
          title: "Your changes have been applied",
          text: "You have successfully changed your username",
        });
        return changeModalType("generic-success");
    }
  };
  return (
    <div className="flex h-screen w-screen justify-center ">
      <section className="my-10 flex h-1/2 w-1/2 flex-col items-center justify-center rounded-md bg-brown-900 bg-gradient-to-r p-4 align-middle">
        <h1 className="mx-auto my-4 font-Handwriting text-2xl">
          Would you like to change your username?
        </h1>
        <h2 className="mx-auto text-xl text-gray-400">
          {" "}
          Please enter your new usernames :
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            "flex flex-col items-center justify-center space-y-5 align-middle"
          }
        >
          <label className="0 mt-10 inline-block ">
            <input
              type="username"
              placeholder="New Username"
              className="white/25 h-8 w-80 bg-[#3A0602]   text-center text-xl shadow-xl !outline-none drop-shadow-xl transition-all duration-300  placeholder:text-orange-700  focus:bg-orange-800 focus:placeholder:text-orange-500 active:drop-shadow-none"
              {...register("newUsername", {
                required: true,
              })}
            />
            {errors.newUsername && (
              <p className="p-1 text-[13px] text-orange-500">
                Please enter a valid username
              </p>
            )}
          </label>
          <button
            type="submit"
            className="buttons-1 !mx-0 h-8 w-32 !bg-[#3A0602] text-center"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Index;

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPassword } from "../../../model/server-side/sendEmail";

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
      <section className="my-10 flex h-1/2 w-1/2 flex-col items-center justify-center rounded-md bg-brown-900 bg-gradient-to-r p-4 align-middle">
        <h1 className="mx-auto my-4 font-Handwriting text-2xl">
          Forgot your password?
        </h1>
        <h2 className="mx-auto text-xl text-gray-400">
          {" "}
          Please enter your email address :
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            "flex flex-col items-center justify-center space-y-5 align-middle"
          }
        >
          <label className="0 mt-10 inline-block ">
            <input
              type="email"
              placeholder="Email"
              className="white/25 h-8 w-80 bg-[#3A0602]   text-center text-xl shadow-xl !outline-none drop-shadow-xl transition-all duration-300  placeholder:text-orange-700  focus:bg-orange-800 focus:placeholder:text-orange-500 active:drop-shadow-none"
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
            className="buttons-1 !mx-0 h-8 w-32 !bg-[#3A0602] text-center"
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

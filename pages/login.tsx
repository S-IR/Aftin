import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import loginBanner from "../public/frontend-used-images/login/loginBanner.png";
import aftinLogo from "../public/frontend-used-images/aftinLogoSvg.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import LoginDiv from "../components/login/LoginDiv";
import SignUpDiv from "../components/login/SignUpDiv";
import { CSSTransition } from "react-transition-group";
import styles from "../styles/Login.module.css";
import Loading from "../components/general/Loading";
import { useSpring, animated, useTransition } from "react-spring";
import { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [user, userLoading] = useAuthState(auth);
  const router = useRouter();

  let { form } = router.query;
  const notProperForm =
    form === undefined || (form !== "login" && form !== "sign-up");
  if (notProperForm) form = "login";

  const pathname = router.pathname;

  const transition = useTransition(form, {
    from: { opacity: 0, translateY: -20 },
    enter: { opacity: 1, translateY: 0 },
    leave: { opacity: 0, translateY: 20 },
    config: { duration: 300 },
  });
  const { loading } = useAuth();

  return (
    <div>
      <Head>
        <title>login</title>
      </Head>
      <div className="w-none relative flex  h-screen w-screen flex-row flex-wrap content-start items-center bg-black py-10 sm:w-auto md:items-center md:justify-center md:bg-transparent">
        <div className="absolute -z-10 ">
          <Image
            src={loginBanner}
            alt="login-artwork"
            layout="intrinsic"
            className="!none -z-10 bg-blend-hard-light sm:!inline"
          />
        </div>
        <div className=" flex h-5/6 w-6/12 flex-col-reverse rounded-sm  bg-[#3A0602]/80 drop-shadow-xl sm:flex-col  ">
          <div className=" relative h-auto "></div>
          {transition((style, item) => (
            <animated.section
              style={style}
              className={` absolute top-0 left-0 h-full w-full`}
            >
              {item === "login" ? (
                <LoginDiv user={user} userLoading={userLoading} />
              ) : (
                <SignUpDiv user={user} userLoading={userLoading} />
              )}
            </animated.section>
          ))}
          {loading ? <Loading /> : null}
        </div>
        <div className="relative row-span-2 my-2 flex w-full justify-center overflow-hidden">
          <button
            className={`m-1 flex h-10 w-48  items-center justify-center rounded-sm text-xl  brightness-90 filter-none  transition-all duration-300  hover:filter ${
              form === "login" ? `text-red-200` : `text-white`
            }`}
            onClick={() =>
              router.replace({
                pathname,
                query: {
                  form: "login",
                },
              })
            }
          >
            Sign In
          </button>
          <button
            className={`m-1 flex h-10 w-48  items-center justify-center rounded-sm text-xl  brightness-90 filter-none  transition-all duration-300  hover:filter ${
              form === "sign-up" ? `text-red-200` : `text-white`
            }`}
            onClick={() =>
              router.replace({
                pathname,
                query: {
                  form: "sign-up",
                },
              })
            }
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

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

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [displayedForm, setDisplayedForm] = useState<`login` | `signUp`>(
    "login"
  );
  const transition = useTransition(displayedForm, {
    from: { opacity: 0, translateY: -20 },
    enter: { opacity: 1, translateY: 0 },
    leave: { opacity: 0, translateY: 20 },
    config: { duration: 100 },
  });
  const { loading } = useAuth();

  return (
    <div>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
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
        <div className=" flex h-4/6 w-6/12 flex-col-reverse rounded-sm  bg-[#3A0602]/80 drop-shadow-xl sm:flex-col  ">
          <div className=" relative h-auto "></div>
          {transition((style, item) => (
            <animated.section
              style={style}
              className={`relative h-auto w-auto`}
            >
              {item === "login" ? <LoginDiv /> : <SignUpDiv />}
            </animated.section>
          ))}
          {loading ? <Loading /> : null}
        </div>
        <div className="relative row-span-2 my-2 flex w-full justify-center overflow-hidden">
          <button
            className={`m-1 flex h-10 w-48  items-center justify-center rounded-sm text-xl  brightness-90 filter-none  transition-all duration-300  hover:filter ${
              displayedForm === "login" ? `text-red-200` : `text-white`
            }`}
            onClick={() => setDisplayedForm("login")}
          >
            Sign In
          </button>
          <button
            className={`m-1 flex h-10 w-48  items-center justify-center rounded-sm text-xl  brightness-90 filter-none  transition-all duration-300  hover:filter ${
              displayedForm === "signUp" ? `text-red-200` : `text-white`
            }`}
            onClick={() => setDisplayedForm("signUp")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

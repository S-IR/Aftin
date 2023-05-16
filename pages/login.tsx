import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginBanner from "../public/login/loginBanner.png";
import aftinLogo from "../public//aftinLogoSvg.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import LoginDiv from "../components/login/LoginDiv";
import SignUpDiv from "../components/login/SignUpDiv";
import { CSSTransition } from "react-transition-group";
import Loading from "../components/general/Loading";
import { useSpring, animated, useTransition } from "react-spring";
import { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";
import styles from "../styles/Login.module.css";
interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [user, userLoading] = useAuthState(auth);
  const router = useRouter();
  let { form: routerForm } = router.query;

  //if someone is redirected to the login page they can use this url query to specifically make the login or the signup appear on the screen
  const [form, setForm] = useState<"login" | "sign-up">("login");
  useEffect(() => {
    if (routerForm !== undefined) {
      setForm(routerForm as "login" | "sign-up");
    }
  }, [routerForm]);

  const pathname = router.pathname;

  const transition = useTransition(form, {
    from: { opacity: 0, translateX: -20 },
    enter: { opacity: 1, translateX: 0 },
    leave: { opacity: 0, translateX: 20 },
    config: { duration: 300 },
  });

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div
        className={`relative flex h-auto  w-full flex-row  bg-black lg:overflow-x-hidden ${styles.loginBanner} overflow-hidden rounded-l-lg`}
      >
        <main
          className={`z-10 flex w-full  flex-col lg:h-[112vh]  ${styles.loginFieldBG} align-middle lg:w-1/4`}
        >
          <div className="flex h-[15vh] w-full items-center justify-center border-b-2 border-black align-middle">
            <button
              className={`m-1 mt-6 flex h-10 w-48 items-center justify-center  rounded-sm font-Handwriting text-4xl text-white underline  brightness-90 filter-none transition-all  duration-300 hover:text-orange-300  hover:filter ${
                form === "login" ? `text-black` : `text-black/50`
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
              Login
            </button>
            <button
              className={`m-1 mt-6 flex h-10 w-48 items-center justify-center  rounded-sm font-Handwriting text-4xl text-white underline  brightness-90 filter-none transition-all  duration-300 hover:text-orange-300  hover:filter ${
                form === "sign-up" ? `text-black` : `text-black/50`
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
          <div className="relative h-full">
            {transition((style, item) => (
              <animated.section
                style={style}
                className={` absolute top-0 left-0 flex h-full w-full flex-col`}
              >
                {item === "login" ? (
                  <LoginDiv user={user} userLoading={userLoading} />
                ) : (
                  <SignUpDiv user={user} userLoading={userLoading} />
                )}
              </animated.section>
            ))}
          </div>
        </main>
        {!isMobile && (
          <div className="z-10 w-[20vw] bg-gradient-to-r from-[#95663A] to-white/0 lg:h-[112vh]"></div>
        )}
      </div>
    </div>
  );
}

export default Login;

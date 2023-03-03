import { Cookie, Restaurant } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { FirebaseError } from "firebase-admin";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CustomCookieConsent from "../../components/policies/privacy/CustomCookieConsent";
import { auth } from "../../firebase";

const Index: NextPage = () => {
  const [user, userLoading] = useAuthState(auth);
  const [loginStatus, setLoginStatus] = useState<
    null | "not logged in" | "unauthorized" | "bronze" | "silver" | "gold"
  >(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (userLoading) return;
      if (user === null) return router.push("/login");
      const token = await user.getIdToken();

      const fetchRes = await fetch(
        `${process.env.NEXT_PUBLIC_server}/api/checkUserStatus`,
        { method: `POST`, body: token }
      ).catch((err: FirebaseError) => console.log(err));
      if (fetchRes === undefined)
        return console.log("response on fetching user status void");
      const { status } = await fetchRes.json();
      setLoginStatus(status);
    };
    fetchUserStatus();
  }, [user]);

  const [cookieConsent, setCookiesConsent] = useState(false);

  return (
    <div className=" flex h-[90vh]">
      <section className="align flex h-[90vh] w-1/4 items-center justify-center bg-gray-700/40 bg-gradient-to-b">
        <div className=" h-auto w-auto rounded-full border-2 border-white/20 p-4 ">
          {user && user.photoURL ? (
            <Image
              src={user.photoURL}
              width={125}
              height={125}
              alt={"user profile picture"}
              className={"rounded-full "}
            />
          ) : (
            <button className="hover-bg-gray-600 h-[125px] w-[125px] rounded-full bg-black transition-all duration-300  ">
              Upload a picture
            </button>
          )}
        </div>
      </section>
      <section className="ml-2 flex flex-grow  flex-col space-y-4 shadow-lg">
        <p className="m-4 font-serif text-4xl text-orange-400">User Profile</p>
        {/* USERNAME */}
        <div className=" flex flex-col  p-2 shadow-sm shadow-orange-800">
          <p className="last: font-serif text-lg text-orange-800 ">Username</p>
          <div className="flex  p-2  ">
            <p className="font-serif text-orange-700">{user?.displayName}</p>
            <button
              className="ml-auto font-serif text-orange-700 underline decoration-orange-700 transition-all duration-300 hover:text-orange-500 hover:decoration-orange-500"
              onClick={() => router.push("/reset/username")}
            >
              {user && user.displayName ? (
                <p>Modify Username</p>
              ) : (
                <p>Set Username</p>
              )}
            </button>
          </div>
        </div>

        {/* EMAIL */}
        <div className=" flex flex-col  p-2 shadow-sm shadow-orange-800">
          <p className="last: font-serif text-lg text-orange-800 ">Email</p>

          <div className="flex  p-2  ">
            <p className="font-serif text-orange-700">{user?.email}</p>
          </div>
        </div>

        {/* PASSWORD */}
        <div className=" flex flex-col  p-2 shadow-sm shadow-orange-800">
          <p className="last: font-serif text-lg text-orange-800 ">Password</p>
          <div className="flex  items-end justify-end p-2 ">
            <button
              className=" ml-auto font-serif text-orange-700 underline decoration-orange-700 transition-all duration-300 hover:text-orange-500 hover:decoration-orange-500 "
              onClick={() => router.push("/reset/password")}
            >
              Reset Password
            </button>
          </div>
        </div>

        {/* SUBSCRIPTION LEVEL  */}
        <div className=" flex flex-col  p-2 shadow-sm shadow-orange-800">
          <p className="last: font-serif text-lg text-orange-800 ">
            Subscription Level
          </p>
          <div className="flex  p-2  ">
            <p className="font-serif text-orange-700">{loginStatus}</p>
            <button className="ml-auto font-serif text-orange-700 underline decoration-orange-700 transition-all duration-300 hover:text-orange-500 hover:decoration-orange-500 ">
              {loginStatus !== "gold"
                ? `Upgrade Account`
                : `Modify Subscription Level`}
            </button>
          </div>
        </div>

        <div className="mt-auto flex h-48 flex-col items-center justify-center  align-middle ">
          <Restaurant sx={{ width: 48, height: 48 }} color="action" />

          <Tooltip
            title="This survey will tell us more about yourself so that we can deliver images better suited for you"
            arrow
            placement="top-start"
          >
            <button className=" font-serif text-orange-700 transition-all duration-300 hover:text-orange-500 ">
              Help us improve your experience by completing this survey
            </button>
          </Tooltip>
          <Cookie className="h-12 w-12" />
          <button
            onClick={() => setCookiesConsent(true)}
            className=" font-serif text-orange-700 transition-all duration-300 hover:text-orange-500 "
          >
            Modify your cookie policy
          </button>
          <CustomCookieConsent
            open={cookieConsent}
            handleClose={() => setCookiesConsent(false)}
          />
        </div>
      </section>
    </div>
  );
};

export default Index;

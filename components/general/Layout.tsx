import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import Footer from "./Footer";
import ConsentCookiesSnackbar from "./snackbars/ConsentCookiesSnackbar";
import WebsiteNavbar from "./WebsiteNavbar";
import AllModalBoxes from "./modal-boxes/AllDialogBoxes";
import { useRouter } from "next/router";
import { auth } from "../../firebase";
import { User } from "firebase/auth";

const Layout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();

  const isFooterVisible =
    !router.pathname.includes("/login") && !router.pathname.includes("404");
  const ad_storage: undefined | "granted" | "denied" | string =
    Cookies.get("ad_storage");
  const analytics_storage: undefined | "granted" | "denied" | string =
    Cookies.get("analytics_storage");
  const functionality_storage: undefined | "granted" | "denied" | string =
    Cookies.get("functionality_storage");
  const security_storage: undefined | "granted" | "denied" | string =
    Cookies.get("security_storage");

  const [cookiesConsentOpen, setCookiesConsent] = useState(false);

  useEffect(() => {
    setCookiesConsent(
      ad_storage === undefined ||
        analytics_storage === undefined ||
        functionality_storage === undefined ||
        security_storage === undefined
    );
  }, []);

  useEffect(() => {
    const handleIdTokenChanged = async (user: User | null) => {
      if (user) {
        const idToken = await user.getIdToken();
        user.refreshToken;
        Cookies.set("idToken", idToken);
      } else {
        Cookies.set("idToken", "");
      }
    };

    // Set up the listener for authentication state changes
    const unregisterAuthObserver = auth.onIdTokenChanged(handleIdTokenChanged);

    // Clean up the listener when the component is unmounted
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  return (
    <>
      <WebsiteNavbar />
      {children}
      {cookiesConsentOpen ? (
        <ConsentCookiesSnackbar
          open={cookiesConsentOpen}
          setCookiesConsent={setCookiesConsent}
        />
      ) : null}
      <AllModalBoxes />
      {isFooterVisible && <Footer />}
    </>
  );
};

export default Layout;

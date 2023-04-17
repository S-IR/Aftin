import Cookies from "js-cookie";
import React, { FC, useEffect, useState } from "react";
import Footer from "./Footer";
import ConsentCookiesSnackbar from "./snackbars/ConsentCookiesSnackbar";
import WebsiteNavbar from "./WebsiteNavbar";
import AllModalBoxes from "./modal-boxes/AllDialogBoxes";

const Layout = ({ children }: React.PropsWithChildren) => {
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
      <Footer />
    </>
  );
};

export default Layout;

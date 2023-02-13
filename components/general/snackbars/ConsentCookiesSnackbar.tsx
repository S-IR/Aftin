import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Snackbar,
  SnackbarContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { Done } from "@mui/icons-material";
import Cookies from "js-cookie";
import * as gtag from "../../../lib/gtag";
import { cookiesConsentOptions } from "../../../constants/general/cookiesConsentOptions";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import CustomCookieConsent from "../../policies/privacy/CustomCookieConsent";
import { useState } from "react";

interface props {
  open: boolean;
  setCookiesConsent: React.Dispatch<React.SetStateAction<boolean>>;
}

interface customInputs {
  ad_storage?: boolean;
  analytics_storage?: boolean;
  functionality_storage?: boolean;
  personalization_storage?: boolean;
  security_storage?: boolean;
}

const ConsentCookiesSnackbar = ({ open, setCookiesConsent }: props) => {
  const [openCustom, setOpenCustom] = useState(false);

  const handleOpenCustom = (event: React.MouseEvent<HTMLElement>) => {
    setOpenCustom(true);
  };

  const handleClose = () => {
    setOpenCustom(false);
  };
  const acceptAllCookies = () => {
    gtag.acceptAllCookies();
    setCookiesConsent(false);
  };

  const rejectAllCookies = () => {
    gtag.rejectAllCookies();
    setCookiesConsent(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={handleClose}
      message="We value your privacy"
      className="z-50 p-2 "
    >
      <SnackbarContent
        message={
          <div className="relative flex flex-col p-2 ">
            <div className="flex items-center justify-center space-x-2 align-middle">
              <span className="  font-serif text-2xl text-red-500 ">
                We value your privacy
              </span>
            </div>

            <div className="flex h-auto w-96 p-5">
              <span className="text-center font-serif text-lg">{`We utilize cookies to enhance your browsing experience, serving personalized ads or content, and analyze our traffic. Cookies are small text files which are placed on your computer to remember preferences and some details of your visit. By clicking "Accept All" or by closing this popup you consent to our use of non-essential cookies`}</span>
            </div>
            <div className="flex w-full space-x-2">
              <button
                onClick={acceptAllCookies}
                className="tex-white w-32 bg-orange-900  p-2 font-bold shadow-sm shadow-black  brightness-125 drop-shadow-xl filter-none transition-all duration-300 hover:shadow-none hover:filter "
              >
                Accept All
              </button>
              <button
                onClick={rejectAllCookies}
                className="w-32 border-2 border-orange-900  p-2 font-bold  text-white shadow-sm shadow-black  brightness-125 drop-shadow-xl filter-none transition-all duration-300 hover:shadow-none hover:filter "
              >
                Reject
              </button>
              <button
                onClick={handleOpenCustom}
                className="w-32 bg-orange-900/10 p-2   font-bold  shadow-sm shadow-black brightness-125 filter-none transition-all duration-300 hover:shadow-none hover:filter  "
              >
                Customize
              </button>
            </div>
            <CustomCookieConsent
              open={openCustom}
              handleClose={handleClose}
            ></CustomCookieConsent>
            <button className="mt-5 font-serif transition-all duration-300 hover:underline">
              {" "}
              Our full privacy policy
            </button>
          </div>
        }
      />
    </Snackbar>
  );
};
export default ConsentCookiesSnackbar;

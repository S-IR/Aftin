import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { cookiesConsentOptions } from "../../../constants/general/cookiesConsentOptions";
import Switch from "@mui/material/Switch/Switch";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import * as gtag from "../../../lib/gtag";
import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";

interface props {
  open: boolean;
  handleClose: () => void;
}

interface customInputs {
  ad_storage?: boolean;
  analytics_storage?: boolean;
  functionality_storage?: boolean;
  personalization_storage?: boolean;
  security_storage?: boolean;
}

export default function CustomCookieConsent({ open, handleClose }: props) {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<customInputs>();

  let ad_storage = Cookies.get("ad_storage") as
    | undefined
    | "granted"
    | "denied";
  let analytics_storage = Cookies.get("analytics_storage") as
    | undefined
    | "granted"
    | "denied";
  let functionality_storage = Cookies.get("functionality_storage") as
    | undefined
    | "granted"
    | "denied";
  let security_storage = Cookies.get("security_storage") as
    | undefined
    | "granted"
    | "denied";

  const consentObj: gtag.ConsentCookiesObs = useMemo(
    () => ({
      ad_storage,
      analytics_storage,
      functionality_storage,
      security_storage,
    }),
    [ad_storage, analytics_storage, functionality_storage, security_storage]
  );

  const onCustomSubmit = (e: customInputs) => {
    console.log("e:", e);

    for (const [key] of Object.entries(e)) {
      if (e[key] === false) e[key] = "denied";
      if (e[key] === true) e[key] = "granted";
    }
    gtag.updateCookies(e as gtag.ConsentCookiesObs);
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontFamily: "serif",
          marginX: "auto",
          fontSize: 32,
        }}
      >
        {"Customize your cookie settings"}
      </DialogTitle>
      <DialogContent className="w-full">
        <form
          onSubmit={handleSubmit(onCustomSubmit)}
          className="z-50 row-span-1 mx-auto  flex-row items-center justify-center   space-y-8 rounded-md bg-gray-900 p-4 text-white drop-shadow-xl sm:w-auto md:px-14"
        >
          <div className="w-full space-y-4">
            {cookiesConsentOptions.map((option) => (
              <div
                key={option.id}
                className="flex h-auto w-full items-center border-y-2 border-gray-500 shadow-md "
              >
                <Controller
                  control={control}
                  name={`${option.id}`}
                  defaultValue={false}
                  render={({ field }) => {
                    return (
                      <Switch
                        disabled={option.id === "functionality_storage"}
                        defaultChecked={consentObj[option.id] === "granted"}
                        {...field}
                      />
                    );
                  }}
                  rules={{
                    required: false,
                  }}
                />
                <p className="w-auto font-serif text-gray-200">
                  {option.name}{" "}
                </p>
                <p className="ml-2"> {option.description}</p>
              </div>
            ))}
          </div>
          <button type="submit" className="general-buttons !mt-2">
            Set Cookies
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

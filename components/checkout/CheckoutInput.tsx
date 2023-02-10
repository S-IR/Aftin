import React, { useEffect, useMemo, useState } from "react";
import { checkoutInputs } from "../../pages/checkout";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import styles from "../../styles/checkout.module.css";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";

interface props {
  register: UseFormRegister<checkoutInputs>;
  w: "sm" | "md" | "lg" | "xl";
  h: "sm" | "md" | "lg" | "xl";
  label: keyof checkoutInputs;
  errors: FieldErrorsImpl<checkoutInputs>;
}

const CheckoutInput = ({ register, w, h, label, errors }: props) => {
  const [isFocused, setIsFocused] = useState(false);

  const heightSize = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-48",
  };
  const widthSize = {
    sm: "w-24",
    md: "w-36",
    lg: "w-54",
    xl: "w-full",
  };

  const minusMarginSize = {
    sm: "-mt-3",
    md: "-mt-[12px]",
    lg: "-mt-[54px]",
    xl: "-mt-[72px]",
  };

  const displayedLabel = useMemo(() => {
    switch (label) {
      case "firstName":
        return "First Name";
      case "lastName":
        return "Last Name";
      case "address":
        return "Address";
      case "country":
        return "Country";
      case "region":
        return "Region";
      case "creditCardInfo":
        return "Card Number";
      case "creditCardName":
        return "Cardholder's Name";
      default:
        return "First Name";
    }
  }, [label]);

  return (
    <div
      className={`relative ${heightSize[h]} ${widthSize[w]} flex-col bg-none  `}
    >
      <label
        htmlFor="firstName"
        className={` pointer-events-none  absolute  z-10  transition-all duration-300 ${
          isFocused
            ? `-top-1/4 left-2 -mt-0  `
            : `top-1/2 ${minusMarginSize[h]} left-4`
        } `}
      >
        <span
          className={`${
            isFocused ? ` text-white/70` : ` text-white`
          } pointer-events-none`}
        >
          {displayedLabel}
        </span>
      </label>
      <input
        className={`  hover:bg-brown-70 h-[80%]  w-full rounded-sm border-r-4  border-gray-900 bg-brown-900 text-center shadow-black drop-shadow-2xl transition-all duration-300 hover:shadow-none focus:bg-brown-700 focus:outline-none active:outline-none`}
        onFocus={() => setIsFocused(true)}
        {...register(label, {
          required: true,
          onBlur: (e) => {
            if (e.target.value.length !== 0) {
              return;
            } else {
              setIsFocused(false);
            }
          },
        })}
        type="text"
      />
      {errors && errors[label] && (
        <span className="w-full text-sm text-red-500">
          {errors[label]?.message}
        </span>
      )}
    </div>
  );
};

export default CheckoutInput;

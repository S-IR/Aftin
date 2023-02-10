import React, {
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { checkoutInputs } from "../../pages/checkout";
import {
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form/dist/types/form";
import styles from "../../styles/checkout.module.css";
import { countryData } from "../../constants/checkout/Countries&Regions";
import { config, useSpring, animated } from "react-spring";

interface props {
  register: UseFormRegister<checkoutInputs>;

  setValue: UseFormSetValue<checkoutInputs>;
  setChosenCountry: SetStateAction<(typeof countryData)[number][`countryName`]>;
}

const CheckoutSelectCountry = ({
  register,
  setValue,
  setChosenCountry,
}: props) => {
  // popup handing states
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  //displayed array variables
  const sortedArr = countryData;
  const [optionsArr, setOptionsArr] = useState<
    typeof countryData | (typeof countryData)[number][`regions`]
  >(sortedArr);

  const datalistStyle = useSpring({
    from: { opacity: 0 },
    to: { opacity: isFocused ? 1 : 0 },
    config: config.gentle,
  });

  const displayedLabel = "Country";

  return (
    <div className={`relative h-12 w-full bg-none `}>
      <label
        htmlFor="firstName"
        className={` pointer-events-none  absolute  z-10  transition-all duration-300 ${
          isFocused || (hasText && !isFocused)
            ? `-top-1/4 left-2 -mt-0  `
            : `top-1/2 left-4 -mt-[72px]`
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
        className={` hover:bg-brown-70   h-full w-full rounded-sm  border-r-4 border-gray-900 bg-brown-900 text-center shadow-black drop-shadow-2xl transition-all duration-300 hover:shadow-none focus:bg-brown-700 focus:outline-none active:outline-none`}
        onFocus={() => setIsFocused(true)}
        //

        {...register("country", {
          required: true,
          onChange: (e) => {
            if (e.target.value.length > 0) {
              setHasText(true);
              setChosenCountry(e.target.value);
            } else {
              setHasText(false);
            }

            setOptionsArr(
              sortedArr.filter((data) =>
                data.countryName.toLowerCase().includes(e.target.value)
              )
            );
          },
        })}
        type={"Text"}
        // onKeyDownCapture={(e) => setInputText(e.currentTarget.value)}
      />

      <animated.section
        className={`scrollable scrollbar absolute top-3/4 -right-28  z-20 flex h-auto max-h-[40vh] w-72 flex-col overflow-y-scroll rounded-sm border-l-4 border-black bg-brown-900 p-4 text-white ${
          !isFocused ? `pointer-events-none` : ``
        } `}
        style={datalistStyle}
      >
        {optionsArr.map((country) => {
          const isSelected = country.countryName === inputRef.current?.value;
          return (
            <div
              key={country.countryShortCode}
              onClick={() => {
                setValue("country", country.countryName);
                setChosenCountry(country.countryName);
                setIsFocused(false);
                setHasText(true);
              }}
              className={`w-ful my-1 h-8 cursor-pointer shadow-md shadow-black transition-all duration-500 hover:bg-brown-700 hover:shadow-none  active:shadow-none ${
                isSelected ? `bg-red-300` : ``
              }`}
            >
              {country.countryName}
            </div>
          );
        })}
      </animated.section>
    </div>
  );
};

export default CheckoutSelectCountry;

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FormState, UseFormHandleSubmit } from "react-hook-form/dist/types";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import {
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form/dist/types/form";
import { z } from "zod";
import { countryData } from "../../constants/checkout/Countries&Regions";
import { checkoutInputs } from "../../pages/checkout";
import CheckoutInput from "./CheckoutInput";
import CheckoutSelect from "./CheckoutSelectCountry";
import CheckoutSelectCountry from "./CheckoutSelectCountry";
import CheckoutSelectRegion from "./CheckoutSelectRegion";

const checkoutAddressSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name must contain at least 1 character")
    .max(36, "First name cannot contain more tha 36 characters"),
  lastName: z
    .string()
    .min(1, "Last Name must contain at least 1 character")
    .max(36, "Last name cannot contain more tha 36 characters"),
  country: z
    .string()
    .min(1, "You must select a country")
    .refine((v) => {
      if (
        countryData.filter((country) => country.countryName === v).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }),
  region: z
    .string()
    .min(1, "You must select a region")
    .refine((v) => {
      if (
        countryData.filter(
          (country) =>
            country.regions.filter((region) => region.name === v).length > 0
        ).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }),
  address: z.string().min(1, "Address must contain at least 1 character"),
});

export type AddressInputs = z.infer<typeof checkoutAddressSchema>;

interface props {
  setPaymentDetails: React.Dispatch<
    React.SetStateAction<Partial<checkoutInputs>>
  >;
  setCheckoutPage: React.Dispatch<React.SetStateAction<number>>;
}
const AddressForm = ({ setPaymentDetails, setCheckoutPage }: props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressInputs>({
    mode: "onBlur",
    resolver: zodResolver(checkoutAddressSchema),
  });
  const [chosenCountry, setChosenCountry] =
    useState<(typeof countryData)[number]["countryName"]>("United States");

  const regionArr = useMemo(() => {
    const country = countryData.find((v) => v.countryName === chosenCountry);
    return country?.regions;
  }, [chosenCountry]);

  const onSubmit: SubmitHandler<AddressInputs> = async ({
    firstName,
    lastName,
    country,
    region,
    address,
  }) => {
    setPaymentDetails((v) => {
      // console.log('we are here')
      return {
        ...v,
        firstName: firstName,
        lastName: lastName,
        country: country,
        region: region,
        address: address,
      };
    });
    setCheckoutPage(2);
  };

  return (
    <section className=" ml-20 flex h-auto min-h-[60vh] w-fit min-w-[50vw] flex-col items-start justify-start space-y-8 rounded-md shadow-gray-700 drop-shadow-2xl ">
      <h2 className="ml-20 font-serif text-6xl text-red-300 ">
        Name & Address
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-auto min-h-[40vh] min-w-[40vw] flex-col space-y-28 bg-white/10 shadow-lg shadow-black  "
      >
        <div className="m-4 flex items-center justify-center space-x-12 align-middle">
          <CheckoutInput
            register={register}
            label={"firstName"}
            w={"md"}
            h={"md"}
            errors={errors}
          />
          <CheckoutInput
            register={register}
            label={"lastName"}
            w={"md"}
            h={"md"}
            errors={errors}
          />
        </div>
        <div className="m-4 flex space-x-12">
          {/* SELECT COUNTRY CODE */}
          <div className={"relative flex h-auto  w-auto flex-col bg-none "}>
            <input
              className=" hover:bg-brown-70 h-[80%]  w-64 rounded-sm border-r-4  border-gray-900 bg-brown-900 text-center shadow-black drop-shadow-2xl transition-all duration-300 hover:shadow-none focus:bg-brown-700 focus:outline-none active:outline-none"
              type="text"
              defaultValue={chosenCountry || "United States"}
              placeholder={"Country"}
              list="countryData"
              {...register("country", {
                required: true,
                onChange: (e) => setChosenCountry(e.target.value),
              })}
            />
            <datalist id={"countryData"} className={"h-8 w-64 bg-black"}>
              {countryData.map(({ countryShortCode, countryName }) => (
                <option key={countryShortCode} value={countryName} />
              ))}
            </datalist>
          </div>

          {/* SELECT REGION CODE */}
          <div className={"relative flex h-auto  w-auto flex-col bg-none "}>
            <input
              className=" hover:bg-brown-70 h-[80%]  w-64 rounded-sm border-r-4  border-gray-900 bg-brown-900 text-center shadow-black drop-shadow-2xl transition-all duration-300 hover:shadow-none focus:bg-brown-700 focus:outline-none active:outline-none"
              type="text"
              placeholder={"Region"}
              list="regionData"
              {...register("region", {
                required: true,
              })}
            />
            {errors["region"] && (
              <span className="w-full text-sm text-red-500">
                {errors["region"]?.message}
              </span>
            )}
          </div>

          <datalist id={"regionData"} className={"h-8 w-64 bg-black"}>
            {regionArr.map(({ name, shortCode }) => (
              <option key={shortCode} value={name} />
            ))}
          </datalist>
        </div>

        <div className="m-4 h-auto w-auto">
          <CheckoutInput
            register={register}
            label={"address"}
            w={"xl"}
            h={"md"}
            errors={errors}
          />
        </div>
        <div className="mx-auto  flex w-full items-center justify-center space-x-10 align-middle">
          <button
            className="buttons-1 h-8 w-32  disabled:bg-gray-500 "
            disabled={true}
            onClick={() => setCheckoutPage((v) => v - 1)}
          >
            Previous
          </button>
          <button
            className="buttons-1 h-8 w-32  disabled:bg-gray-500"
            type={"submit"}
          >
            Next
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddressForm;

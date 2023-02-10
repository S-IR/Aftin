import React, { useState } from "react";
import { FormState, UseFormHandleSubmit } from "react-hook-form/dist/types";
import { FieldErrorsImpl } from "react-hook-form/dist/types/errors";
import {
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form/dist/types/form";
import { countryData } from "../../constants/checkout/Countries&Regions";
import { checkoutInputs } from "../../pages/checkout";
import CheckoutInput from "./CheckoutInput";
import CheckoutSelect from "./CheckoutSelectCountry";
import CheckoutSelectCountry from "./CheckoutSelectCountry";
import CheckoutSelectRegion from "./CheckoutSelectRegion";

interface props {
  register: UseFormRegister<checkoutInputs>;
  setValue: UseFormSetValue<checkoutInputs>;
  errors: FieldErrorsImpl<checkoutInputs>;
}
const AddressForm = ({ register, setValue, errors }: props) => {
  const [chosenCountry, setChosenCountry] = useState<
    (typeof countryData)[number]["countryName"] | null
  >(null);

  return (
    <section className=" ml-20 flex h-auto min-h-[60vh] w-fit min-w-[50vw] flex-col items-start justify-start space-y-8 rounded-md shadow-gray-700 drop-shadow-2xl ">
      <h2 className="ml-20 font-serif text-6xl text-red-300 ">
        Name & Address
      </h2>
      <div className="h-auto min-h-[40vh] min-w-[40vw] flex-col space-y-28 bg-white/10 shadow-lg shadow-black  ">
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
        <div className="m-4 flex space-x-6">
          <CheckoutSelectCountry
            register={register}
            setValue={setValue}
            setChosenCountry={setChosenCountry}
          />
          <CheckoutSelectRegion
            register={register}
            setValue={setValue}
            chosenCountry={chosenCountry}
          />
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
      </div>
    </section>
  );
};

export default AddressForm;

import React from "react";
import { UseFormRegister } from "react-hook-form";
import { checkoutInputs } from "../../pages/checkout";
import CheckoutInput from "./CheckoutInput";

interface props {
  register: UseFormRegister<checkoutInputs>;
}

const CreditCardForm = ({ register }: props) => {
  return (
    <section className=" ml-20 flex h-auto min-h-[60vh] w-fit min-w-[50vw] flex-col items-start justify-start space-y-8 rounded-md shadow-gray-700 drop-shadow-2xl ">
      <h2 className="ml-20 font-serif text-6xl text-red-300 ">
        Credit Card Information
      </h2>
      <div className="h-auto min-h-[40vh] min-w-[40vw] flex-col space-y-12 bg-white/10 shadow-lg shadow-black  ">
        <div className="m-20  flex flex-col items-start justify-start space-y-10 align-middle">
          <CheckoutInput
            register={register}
            label={"creditCardInfo"}
            w={"xl"}
            h={"md"}
          />
          <CheckoutInput
            register={register}
            label={"creditCardName"}
            w={"lg"}
            h={"md"}
          />
        </div>
        {/* <div className="m-4 flex space-x-6">
          <CheckoutInput
            register={register}
            label={"country"}
            w={"md"}
            h={"md"}
          />
          <CheckoutInput
            register={register}
            label={"region"}
            w={"md"}
            h={"md"}
          />
        </div>
        <div className="m-4 h-auto w-auto">
          <CheckoutInput
            register={register}
            label={"address"}
            w={"xl"}
            h={"md"}
          />
        </div> */}
      </div>
    </section>
  );
};

export default CreditCardForm;

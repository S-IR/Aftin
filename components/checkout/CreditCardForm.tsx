import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { checkoutInputs } from "../../pages/checkout";
import CheckoutInput from "./CheckoutInput";

interface props {
  setCheckoutPage: React.Dispatch<React.SetStateAction<number>>;
}
export const creditCardSchema = z.object({
  creditCardInfo: z.string().min(4, "Credit Card length is too short"),
  creditCardName: z.string().min(1, "Please insert your credit card name"),
});
export type CreditCardInputs = z.infer<typeof creditCardSchema>;

const CreditCardForm = ({ setCheckoutPage }: props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreditCardInputs>({
    mode: "onBlur",
    resolver: zodResolver(creditCardSchema),
  });

  const CreditCardForm = ({}: props) => {
    return (
      <section className=" ml-20 flex h-auto min-h-[60vh] w-fit min-w-[50vw] flex-col items-start justify-start space-y-8 rounded-md shadow-gray-700 drop-shadow-2xl ">
        <h2 className="ml-20 font-serif text-6xl text-red-300 ">
          Credit Card Information
        </h2>
        <form className="h-auto min-h-[40vh] min-w-[40vw] flex-col space-y-12 bg-white/10 shadow-lg shadow-black  ">
          <div className="m-20  flex flex-col items-start justify-start space-y-10 align-middle">
            <CheckoutInput
              register={register}
              label={"creditCardInfo"}
              w={"xl"}
              h={"md"}
              errors={errors}
            />
            <CheckoutInput
              register={register}
              label={"creditCardName"}
              w={"lg"}
              h={"md"}
              errors={errors}
            />
          </div>
        </form>
      </section>
    );
  };
};

export default CreditCardForm;

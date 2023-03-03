import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTransition, animated } from "react-spring";
import {
  AddressForm,
  CreditCardForm,
  PaymentConfirmation,
  PaymentStepsSVG,
} from "../../components/checkout";
import { countryData } from "../../constants/checkout/Countries&Regions";
import styles from "../../styles/checkout.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(1).max(36).regex(new RegExp("/\b[^dW]+\b/g")),
  lastName: z.string().min(1).max(36).regex(new RegExp("/\b[^dW]+\b/g")),
  country: z
    .string()
    .min(1)
    .refine((v) => {
      if (
        countryData.filter((country) => country.countryName === v).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    }),
  region: z.string().min(1),
  address: z.string().min(1),
  creditCardInfo: z.string().min(1),
  creditCardName: z.string().min(1),
});

export type checkoutInputs = z.infer<typeof checkoutSchema>;

const Index: NextPage = () => {
  const router = useRouter();
  let tier = router.query.tier;

  if (tier === undefined) tier = "silver";
  const checkoutPageSchema = z.number().gt(0).lt(3);

  type CheckoutPage = z.infer<typeof checkoutPageSchema>;

  const [checkoutPage, setCheckoutPage] = useState<CheckoutPage>(1);

  const [paymentDetails, setPaymentDetails] = useState<Partial<checkoutInputs>>(
    {
      firstName: undefined,
      lastName: undefined,
      country: undefined,
      region: undefined,
      address: undefined,
      creditCardInfo: undefined,
      creditCardName: undefined,
    }
  );

  useEffect(() => {
    console.log(`checkoutPage`, checkoutPage);
  }, [checkoutPage]);

  const determineForm = (page: 1 | 2 | 3) => {
    switch (page) {
      case 1:
        return (
          <AddressForm
            setPaymentDetails={setPaymentDetails}
            setCheckoutPage={setCheckoutPage}
          />
        );
      case 2:
        return <CreditCardForm setPaymentDetails={setPaymentDetails} />;
      case 3:
        return <PaymentConfirmation />;
      default:
        return;
    }
  };

  const transition = useTransition(checkoutPage, {
    from: { opacity: 0, translateX: -20 },
    enter: { opacity: 1, translateX: 0 },
    leave: { opacity: 0, translateX: 20 },
    config: { duration: 300 },
  });

  return (
    <div
      className={`
        absolute top-0 flex h-screen w-screen flex-col justify-end   align-bottom ${styles.checkoutBG}
      `}
    >
      <div>
        {transition((style, i) => (
          <animated.section
            className={`absolute top-10 h-auto w-auto`}
            style={style}
          >
            {determineForm(i)}
          </animated.section>
        ))}

        {/* <div className="mx-auto  flex w-full items-center justify-center space-x-10 align-middle">
          <button
            className="buttons-1 h-8 w-32  disabled:bg-gray-500 "
            disabled={checkoutPage === 1}
            onClick={() => setCheckoutPage((v) => v - 1)}
          >
            Previous
          </button>
          {checkoutPage !== 2 ? (
            <button
              className="buttons-1 h-8 w-32  disabled:bg-gray-500"
              disabled={checkoutPage === 3}
              onClick={() => setCheckoutPage((v) => v + 1)}
            >
              Next
            </button>
          ) : (
            <button
              className="buttons-1 h-8 w-32  disabled:bg-gray-500"
              type={"submit"}
            >
              Submit
            </button>
          )}
        </div> */}
      </div>
      <PaymentStepsSVG />
    </div>
  );
};

export default Index;

import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useTransition, animated } from "react-spring";
import {
  AddressForm,
  CreditCardForm,
  PaymentConfirmation,
  PaymentStepsSVG,
} from "../../components/checkout";
import { countryData } from "../../constants/purchase/Countries&Regions";

const Index: NextPage = () => {
  const router = useRouter();
  let tier = router.query.tier;

  if (tier === undefined) tier = "silver";

  const [checkoutPage, setCheckoutPage] = useState<1 | 2 | 3>(1);
  // const [country, setCountry] = useState<string>("United States");
  // const [region, setRegion] = useState<string>("United States");

  const determineForm = (page: 1 | 2 | 3) => {
    switch (page) {
      case 1:
        return <AddressForm />;
      case 2:
        return <CreditCardForm />;
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
      className={
        "relative flex h-screen w-screen flex-col justify-end bg-gradient-to-br from-black to-gray-800 align-bottom "
      }
    >
      {transition((style, i) => (
        <animated.section style={style}>{determineForm(i)}</animated.section>
      ))}
      <div className="mx-auto flex space-x-10">
        <button
          className="buttons-1 w-24  disabled:bg-gray-500 "
          disabled={checkoutPage === 1}
          onClick={() => setCheckoutPage((v) => v - 1)}
        >
          Previous
        </button>
        <button
          className="buttons-1 w-24  disabled:bg-gray-500"
          disabled={checkoutPage === 3}
          onClick={() => setCheckoutPage((v) => v + 1)}
        >
          Next
        </button>
      </div>
      <PaymentStepsSVG />
    </div>
  );
};

export default Index;

import { Check } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";
import {
  tierBenefit,
  tierBenefits,
} from "../../constants/homepage/tierBenefits";
import { useTrail, animated as a, useSpring } from "react-spring";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

/**
 * Sixth component of the homepage. Meant to link the homepage to the different purchase plans
 * @returns
 */
const HomepageTiers = () => {
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<
    "Yearly" | "Monthly"
  >("Yearly");

  const { ref: hTwoRef, inView: hTwoVisible } = useInView({
    triggerOnce: true,
  });
  const hTwoStyles = useSpring({
    opacity: hTwoVisible ? 1 : 0,
    transform: `translateX(${hTwoVisible ? 0 : 20}%)`,
  });

  return (
    <section className="relative flex h-auto min-h-[70vh] w-screen flex-col items-center border-y-2 border-gray-500 bg-white/10 py-10">
      <Image
        className="absolute top-0 left-0 brightness-[25%] filter"
        fill
        src={"/frontend-used-images/homepage/HomepageTiersBG.png"}
        alt={"Background image to present our payment tiers on Aftin Homepage"}
        style={{ objectFit: "fill" }}
      />
      <a.h2
        className="mt-6 bg-gradient-to-br from-red-300  to-white bg-clip-text text-center font-Handwriting text-4xl  text-transparent md:text-8xl"
        ref={hTwoRef}
        style={hTwoStyles}
      >
        Our subscription tier list
      </a.h2>
      <div className="z-20 mt-10 flex h-10 space-x-14">
        <button
          onClick={() => setSubscriptionPeriod("Monthly")}
          className={`font-handwriting buttons-3 w-28   font-serif text-4xl   ${
            subscriptionPeriod === `Monthly` ? `text-red-300` : ""
          } transition-all duration-300`}
        >
          Monthly
        </button>

        <button
          onClick={() => setSubscriptionPeriod("Yearly")}
          className={`font-handwriting buttons-3 w-28   font-serif text-4xl   ${
            subscriptionPeriod === `Yearly` ? `text-red-300` : ""
          } transition-all duration-300`}
        >
          Yearly
        </button>
      </div>
      <div className="z-20 mt-6 flex w-full flex-col items-center justify-center space-y-12 align-middle md:flex-row md:space-x-48 md:space-y-0">
        {tierBenefits.map((tier) => {
          return TierDescription(tier, subscriptionPeriod);
        })}
      </div>
    </section>
  );
};

export default HomepageTiers;
function TierDescription(
  tier: tierBenefit,
  subscriptionPeriod: "Monthly" | "Yearly"
) {
  return (
    <div
      key={tier.name}
      className={
        "h-[75vh] w-1/2  rounded-md bg-gradient-to-br from-brown-700 to-brown-900 p-1 md:w-[18vw] "
      }
    >
      <div
        className={`group relative  flex  h-full  w-full   justify-center bg-black transition-all duration-300 `}
      >
        <p className="absolute top-[35%] text-center  font-Handwriting text-2xl text-yellow-300 transition-all duration-300 group-hover:text-red-300 md:top-[30%] md:text-4xl">
          {tier.name}
          <br></br>
          <a.span className="text-2xl text-red-300">
            {subscriptionPeriod === `Monthly`
              ? tier.monthPrice
              : tier.yearlyPerMonthPrice}
          </a.span>
          <br></br>
          {subscriptionPeriod === "Yearly" && tier.monthPrice !== "Free" && (
            <span className="!m-0 !p-0 text-xl">Per month</span>
          )}
        </p>
        <div className="absolute top-[42%] mt-20 flex flex-col items-center justify-center align-middle transition-all duration-300 ">
          {tier.benefits.map((tierBenefit) => (
            <div key={tierBenefit} className={"flex h-16 w-full"}>
              <Check
                width={16}
                height={16}
                color={"success"}
                className={"mx-2"}
              />
              <p className=" md:text-md mx-2 font-serif text-sm">
                {" "}
                {tierBenefit}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute -bottom-8   h-auto   ">
          <Link
            href={`/checkout?tier=${tier.value}&period=${subscriptionPeriod}`}
          >
            <p className="buttons-3 h-min  w-48  rounded-sm bg-brown-900/50 font-serif text-lg font-thin text-red-300 no-underline shadow-md shadow-black transition-all  duration-500 group-hover:bg-brown-900 ">
              Learn more
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { NextPage } from "next";
import React from "react";
import {
  BeautySells,
  HowItStarted,
  PeopleEat,
  SellAtmosphere,
  TopBanner,
  UniquenessIsParamount,
  WeWelcomeYou,
} from "../components/about-us";
import { NextSeo } from "next-seo";

const AboutUs: NextPage = () => {
  return (
    <main>
      {/* <NextSeo
        title="Aftin - About Us"
        description="Aftin is a graphic design agency made to deliver images to unique restaurants. We portray their brand through images"
      /> */}
      <TopBanner />
      <HowItStarted />
      <BeautySells />
      <PeopleEat />
      <SellAtmosphere />
      <UniquenessIsParamount />
      <WeWelcomeYou />
    </main>
  );
};

export default AboutUs;

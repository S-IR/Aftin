import type { NextPage } from "next";
import Head from "next/head";

import { Snackbar, SnackbarContent } from "@mui/material";
import { MdOutlineImage } from "react-icons/md";
import CachedImageSnackbar from "../components/general/snackbars/CachedImageSnackbar";
import {
  CreateWithUs,
  HomeBanner,
  HomeIntro,
  HomepageGallery,
  HomepageHireProfessional,
  HomepageTiers,
  OurFeatures,
  StudiesBox,
} from "../components/homepage";
import { NextSeo } from "next-seo";
import {
  appetizers_array,
  drinks_array,
  fast_foods_array,
  gr_des_style_array,
  ingredients_array,
  main_dish_array,
  soups_array,
  stickers_and_cliparts_categories,
  sweets_and_desserts_array,
  tables_arr,
} from "../typings/image-types/ImageTypes";
import { MockupTypeArr } from "../constants/mockups/previewCategories";
import { useCachedStore } from "../zustand/CachedImageStore/store";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { requestSetTier } from "../model/client-side/users/setters/requestSetTier";
import { requestSetSessionCookie } from "../model/client-side/users/setters/requestSetSessionCookie";

// const StudiesBox = dynamic(() => import("../components/homepage/StudiesBox"), {
//   ssr: false,
// });

// const OurFeatures = dynamic(
//   () => import("../components/homepage/OurFeatures"),
//   {
//     ssr: false,
//   }
// );

// const HomepageHireProfessional = dynamic(
//   () => import("../components/homepage/HomepageHireProfessional"),
//   {
//     ssr: false,
//   }
// );

// const HomepageTiers = dynamic(
//   () => import("../components/homepage/HomepageTiers"),
//   {
//     ssr: false,
//   }
// );

// const HomepageGallery = dynamic(
//   () => import("../components/homepage/HomepageGallery"),
//   {
//     ssr: false,
//   }
// );

const Home: NextPage = () => {
  const cachedImage = useCachedStore((store) => store.imageBeforeRedirect);

  return (
    <>
      <NextSeo
        title="Aftin - Homepage"
        description="Aftin is a graphic design library for unique, colorful and elegant restaurants. Express your restaurant through images"
      />
      <main
        className={`website-theme-image max-w-full overflow-x-hidden font-serif `}
      >
        <HomeBanner />
        <HomeIntro />
        <StudiesBox />
        <OurFeatures />
        <HomepageHireProfessional />
        <HomepageTiers />
        <HomepageGallery />
        {cachedImage !== null && (
          <CachedImageSnackbar cachedImage={cachedImage} />
        )}
      </main>
    </>
  );
};

export default Home;

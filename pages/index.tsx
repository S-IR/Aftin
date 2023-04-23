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

const Home: NextPage = () => {
  const cachedImage = useCachedStore((store) => store.imageBeforeRedirect);
  return (
    <>
      <Head>
        <NextSeo
          title="Aftin - Unique Graphic Designs for Restaurants"
          description="Aftin is a graphic design library for unique, colorful and elegant restaurants. Express your restaurant through images"
        />
        <title>Aftin - Homepage</title>
      </Head>
      <main className="website-theme-image max-w-full overflow-x-hidden">
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

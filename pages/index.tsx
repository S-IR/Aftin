import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAppSelector } from "../Redux/hooks";
import { cachedImageCount } from "../features/cachedImage/cachedImageSlice";
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

const Home: NextPage = () => {
  const cachedImage = useAppSelector(cachedImageCount).image;

  return (
    <>
      <Head>
        <title>Aftin</title>
      </Head>
      <main className="website-theme-image">
        <HomeBanner />
        <HomeIntro />
        <StudiesBox />
        {/* <CreateWithUs /> */}
        <OurFeatures />
        <HomepageHireProfessional />
        <HomepageTiers />
        <HomepageGallery />
        <CachedImageSnackbar cachedImage={cachedImage} />
      </main>
    </>
  );
};

export default Home;

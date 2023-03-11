import { url } from "inspector";
import {
  GetServerSideProps,
  GetStaticProps,
  NextPage,
  NextPageContext,
} from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { dehydrate, QueryClient } from "react-query";
import SiteGallery from "../../components/general/SiteGallery";
import SortingSidebar from "../../components/general/SortingSidebar";
import { requestImageDocs } from "../../model/client-side/image-functions/requestImages";
import { confirmValidUrlParams } from "../../model/client-side/image-gallery/confirmValidUrlParams";
import { determinePageMetas } from "../../model/server-side/image-gallery/determinePageMetas";
import { queryImagesServerSide } from "../../model/server-side/image-gallery/queryImagesServerSide";
import {
  ImgDoc,
  SecondDegreeCategory,
  ThirdDegreeCategory,
} from "../../typings/image-types/ImageTypes";

interface props {
  pageMetas: { title: string; description: string; canonical: string };
}
const Index = ({ pageMetas, initialData }: props) => {
  const [showSidebar, toggleSidebar] = useState(true);
  useEffect(() => {
    if (isMobile) toggleSidebar(false);
  }, [isMobile]);

  return (
    <>
      <NextSeo
        title={pageMetas.title}
        description={pageMetas.description}
        canonical={pageMetas.canonical}
      />
      <div className="flex h-auto w-full">
        <SortingSidebar
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
        />
        <main className={` flex-grow `}>
          <SiteGallery showSidebar={showSidebar} initialData={initialData} />
        </main>
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const urlStatus = confirmValidUrlParams(params.imageCategory);
  if (
    urlStatus === "invalid" ||
    params === undefined ||
    params.imageCategory === undefined
  ) {
    return {
      notFound: true,
    };
  }
  const pageMetas = determinePageMetas(
    req.url,
    params.imageCategory[0] as SecondDegreeCategory,
    params.imageCategory.length > 1
      ? (params.imageCategory[1] as ThirdDegreeCategory)
      : undefined
  );
  const dehydratedState = await queryImagesServerSide(req.url, params);
  return {
    props: {
      pageMetas,
      dehydratedState,
    },
  };
};
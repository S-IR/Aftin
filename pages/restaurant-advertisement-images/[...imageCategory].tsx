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
import SiteGallery from "../../components/general/SiteGallery";
import SortingSidebar from "../../components/general/SortingSidebar";
import { requestImageDocs } from "../../model/client-side/image-functions/requestImages";
import { determinePageMetas } from "../../model/server-side/image-gallery/determinePageMetas";
import { queryImagesServerSide } from "../../model/server-side/image-gallery/queryImagesServerSide";
import {
  ImgDoc,
  SecondDegreeCategory,
  ThirdDegreeCategory,
} from "../../typings/image-types/ImageTypes";
import { isValidUrlParams } from "../../model/client-side/image-gallery/confirmValidUrlParams";
import { cookies } from "next/dist/client/components/headers";
import { LoginStatus } from "../../typings/typings";
import { useIsMobile } from "../../hooks/useIsMobile";
import { performance, PerformanceObserver } from "perf_hooks";

interface props {
  pageMetas: { title: string; description: string; canonical: string };
}
const Index = ({ pageMetas }: props) => {
  const isMobile = useIsMobile();
  const [showSidebar, toggleSidebar] = useState(true);
  useEffect(() => {
    if (isMobile) toggleSidebar(false);
  }, [isMobile]);

  return (
    <>
      {/* <NextSeo
        title={pageMetas.title}
        description={pageMetas.description}
        canonical={pageMetas.canonical}
      /> */}
      <div className="flex h-auto w-full">
        <SortingSidebar
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
        />
        <main className={` flex-grow `}>
          <SiteGallery showSidebar={showSidebar} />
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
  if (params === undefined || params.imageCategory === undefined) {
    return {
      notFound: true,
    };
  }

  const validParamsCheck = isValidUrlParams(params.imageCategory);
  if (!validParamsCheck) {
    return {
      notFound: true,
    };
  }

  let idToken = req.cookies.idToken;
  if (idToken === undefined) idToken = "";
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

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

import ChoosePreview from "../../components/mockups/ChoosePreview";
import dynamic from "next/dynamic";
import Head from "next/head";
import { NextSeo } from "next-seo";
import {
  MockupType,
  MockupTypeArr,
} from "../../constants/mockups/previewCategories";
import { useMockupsStore } from "../../zustand/MockupsStore/store";
import { determineMockupMeta } from "../../model/client-side/mockups/determineMockupMeta";

const PreviewCanvas = dynamic(
  () => import("../../components/mockups/PreviewCanvas"),
  {
    ssr: false,
  }
);
const PreviewDropzoneComp = dynamic(
  () => import("../../components/mockups/PreviewDropzoneComp"),
  {
    ssr: false,
  }
);

interface props {
  mockupType: MockupType;
}

const Index: NextPage = ({ mockupType }: props) => {
  const router = useRouter();
  const metas = determineMockupMeta(mockupType);
  const images = useMockupsStore((state) => state.images);
  const areThereImages = images.length > 0;
  return (
    <>
      <Head>
        <NextSeo
          title={metas.title}
          description={metas.description}
          canonical={metas.canonical}
        />
      </Head>
      <div className="flex sm:min-h-[540px] md:min-h-[1080px] ">
        <ChoosePreview mockupType={mockupType} />
        <main className="ml-4 h-full w-full rounded-md ">
          {areThereImages ? (
            <PreviewCanvas mockupType={mockupType} />
          ) : (
            <PreviewDropzoneComp />
          )}
        </main>
      </div>
    </>
  );
};

export default Index;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = MockupTypeArr.map((mockupType) => {
    return {
      params: { mockupType },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const mockupType = params ? params.mockupType : undefined;
  return {
    // Passed to the page component as props
    props: { mockupType },
  };
};

import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  previewCategoryNames,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/mockups/previewCategories";
import ChoosePreview from "../../components/mockups/ChoosePreview";
import dynamic from "next/dynamic";
import { useMockupsStore } from "../../zustand/MockupsStore/store";
import Head from "next/head";
import { NextSeo } from "next-seo";

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

export type previewSelectedCategory = {
  name: previewCategoryNames;
  value: previewCategoryValues;
};

const Index: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<{
    name: previewCategoryNames;
    value: previewCategoryValues;
  }>({ name: "Phone", value: "phone" });

  const mockupType = null;
  const images = useMockupsStore((state) => state.images);
  const areThereImages = images.length > 0;
  return (
    <>
      <Head>
        <NextSeo
          title={"Images Previewer for Restaurants"}
          description={
            "Preview menus, banners or just food images with in different environments such as facebook post, outside or in hand"
          }
        />
      </Head>
      <div className="flex sm:min-h-[540px] md:min-h-[1080px] ">
        {/* <ChoosePreview mockupType={mockupType} />
        <main className="ml-4 h-full w-full rounded-md ">
          {areThereImages ? (
            <PreviewCanvas selectedCategory={selectedCategory} />
          ) : (
            <PreviewDropzoneComp />
          )}
        </main> */}
      </div>
    </>
  );
};

export default Index;

import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  previewCategoryNames,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/previews/previewCategories";
import ChoosePreview from "../../components/previews/ChoosePreview";
import dynamic from "next/dynamic";
import { usePreviewsStore } from "../../zustand/PreviewsStore/store";
import Head from "next/head";

const PreviewCanvas = dynamic(
  () => import("../../components/previews/PreviewCanvas"),
  {
    ssr: false,
  }
);
const PreviewDropzoneComp = dynamic(
  () => import("../../components/previews/PreviewDropzoneComp"),
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

  const images = usePreviewsStore((state) => state.images);
  const areThereImages = images.length > 0;
  return (
    <>
      <Head>
        <title>Image Previewer for Restaurants</title>
      </Head>
      <div className="flex h-screen  ">
        <ChoosePreview
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <main className="ml-[256px] h-full w-full rounded-md bg-white">
          {areThereImages ? (
            <PreviewCanvas selectedCategory={selectedCategory} />
          ) : (
            <PreviewDropzoneComp />
          )}
        </main>
      </div>
    </>
  );
};

export default Index;

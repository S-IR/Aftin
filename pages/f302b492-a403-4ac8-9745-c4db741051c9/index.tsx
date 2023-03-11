import React, { useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  GraphicDesignsOptions as GraphicDesignsOptions,
  GraphicDesignType,
  FirstDegreeCategory,
  AdvertImagesOptions,
  AdvertImageType,
  SecondDegreeCategory,
} from "../../typings/image-types/ImageTypes";
import { GetServerSideProps } from "next";
import { getUserTier } from "../../firebaseAdmin";
import dynamic from "next/dynamic";
const UploadImageComp = dynamic(
  () => import("../../components/general/UploadImageComp"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Index = (LOGIN_DATA: Object) => {
  const [largeCategory, setLargeCategory] =
    useState<null | FirstDegreeCategory>(null);
  const [smallCategory, setSmallCategory] =
    useState<null | SecondDegreeCategory>(null);

  const handleLargeCategory = (e: SelectChangeEvent) => {
    setLargeCategory(e.target.value as FirstDegreeCategory);
  };

  const handleSmallCategory = (e: SelectChangeEvent) => {
    setSmallCategory(e.target.value as GraphicDesignType | AdvertImageType);
  };

  console.log("largeCategory", largeCategory, "smallCategory", smallCategory);

  return (
    <>
      <Box sx={{ width: 1000, padding: 10, background: `white` }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Large Image Category
          </InputLabel>
          <Select label="Choose large category" onChange={handleLargeCategory}>
            <MenuItem
              key={"advertisement-images"}
              value={"advertisement-images"}
            >
              {`Advertisement Images`}
            </MenuItem>
            <MenuItem key={"graphic-designs"} value={"graphic-designs"}>
              {`Graphic Designs`}
            </MenuItem>
            <MenuItem key={`null`} value={null}>
              {`null`}
            </MenuItem>
          </Select>
        </FormControl>

        {largeCategory === `advertisement-images` && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Small Image Category
            </InputLabel>
            <Select
              label="Choose stock image type"
              onChange={handleSmallCategory}
            >
              {AdvertImagesOptions.map((AdvertImageOption: AdvertImageType) => (
                <MenuItem key={AdvertImageOption} value={AdvertImageOption}>
                  {AdvertImageOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {largeCategory === `graphic-designs` && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Image Category
            </InputLabel>
            <Select
              label="Choose stock image type"
              onChange={handleSmallCategory}
            >
              {GraphicDesignsOptions.map(
                (GraphicDesignOption: GraphicDesignType) => (
                  <MenuItem
                    key={GraphicDesignOption}
                    value={GraphicDesignOption}
                  >
                    {GraphicDesignOption}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        )}
      </Box>
      {largeCategory !== null && smallCategory !== null && (
        <UploadImageComp
          FirstDegreeCategory={largeCategory}
          SecondDegreeCategory={smallCategory}
        />
      )}
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if ("LOGIN_DATA" in req.cookies) {
    const LOGIN_DATA = req.cookies.LOGIN_DATA;
    const userTier = await getUserTier(LOGIN_DATA as string);

    return { props: { LOGIN_DATA: userTier } };
  } else {
    return { props: { LOGIN_DATA: "" } };
  }
};

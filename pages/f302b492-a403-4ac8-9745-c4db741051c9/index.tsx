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
  GrahicDesignsOptions as GraphicDesignsOptions,
  GraphicDesignType,
  LARGE_CATEGORY_OF_IMG,
  AdvertImagesOptions,
  AdvertImageType,
} from "../../typings/image-types/ImageTypes";
import { GetServerSideProps } from "next";
import { getUserTier } from "../../firebaseAdmin";
import UploadImageComp from "../../components/general/UploadImageComp";

const Index = (LOGIN_DATA: Object) => {
  const [largeCategory, setLargeCategory] =
    useState<null | LARGE_CATEGORY_OF_IMG>(null);
  const [smallCategory, setSmallCategory] = useState<
    null | GraphicDesignType | AdvertImageType
  >(null);

  const handleLargeCategory = (e: SelectChangeEvent) => {
    setLargeCategory(e.target.value as LARGE_CATEGORY_OF_IMG);
  };

  const handleSmallCategory = (e: SelectChangeEvent) => {
    setSmallCategory(e.target.value as GraphicDesignType | AdvertImageType);
  };

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
          LARGE_CATEGORY_OF_IMG={largeCategory}
          SMALL_CATEGORY_OF_IMG={smallCategory}
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

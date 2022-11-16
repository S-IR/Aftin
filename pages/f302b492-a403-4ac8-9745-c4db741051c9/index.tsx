import React, { useState } from 'react'

import { verify } from 'jsonwebtoken';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { GrahicDesignsOptions as GraphicDesignsOptions, GraphicDesignType, LARGE_CATEGORY_OF_IMG, StockImagesOptions, StockImageType } from '../../typings/image-types/ImageTypes';
import UploadImageComp from '../../components/UploadImageComp';





const Index = (LOGIN_DATA: Object) => {

  const [largeCategory, setLargeCategory] = useState<null | LARGE_CATEGORY_OF_IMG>(null)
  const [smallCategory, setSmallCategory] = useState<null | GraphicDesignType | StockImageType>(null)

  const handleLargeCategory = (e: SelectChangeEvent) => {
    setLargeCategory(e.target.value as LARGE_CATEGORY_OF_IMG)
  }

  const handleSmallCategory = (e: SelectChangeEvent) => {
    setSmallCategory(e.target.value as GraphicDesignType | StockImageType)
  }

  if (LOGIN_DATA === undefined || Object.values(LOGIN_DATA).toString() !== 'St1wYqtz7Hao1t3cDXwOCzzcc8m1') {
    return (
      <div>You don't have access here</div>
    )
  }
  else {

    return (
      <>
        <Box sx={{ width: 1000, padding: 10, background: `white` }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Large Image Category</InputLabel>
            <Select
              label="Choose large category"
              onChange={handleLargeCategory}
            >
              <MenuItem key={'stock-images'} value={'stock-images'}>{`Stock Images`}
              </MenuItem>
              <MenuItem key={'graphic-designs'} value={'graphic-designs'}>{`Graphic Designs`}
              </MenuItem>
            </Select >
          </FormControl>

          {largeCategory === `stock-images` &&
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Small Image Category</InputLabel>
              <Select
                label="Choose stock image type"
                onChange={handleSmallCategory}
              >
                {StockImagesOptions.map((StockImageOption: StockImageType) => (
                  <MenuItem key={StockImageOption} value={StockImageOption}>{StockImageOption}</MenuItem>
                ))}
              </Select >
            </FormControl>
          }
          {largeCategory === `graphic-designs` &&
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Image Category</InputLabel>
              <Select
                label="Choose stock image type"
                onChange={handleSmallCategory}
              >
                {GraphicDesignsOptions.map((GraphicDesignOption: GraphicDesignType) => (
                  <MenuItem key={GraphicDesignOption} value={GraphicDesignOption}>{GraphicDesignOption}</MenuItem>
                ))}
              </Select >
            </FormControl>
          }

        </Box>
        {largeCategory !== null && smallCategory !== null && <UploadImageComp LARGE_CATEGORY_OF_IMG={largeCategory} SMALL_CATEGORY_OF_IMG={smallCategory} /> }
      </>
    )
  }



}

export default Index

export function getServerSideProps({ req, res }) {

  if ('LOGIN_DATA' in req.cookies) {

    const jwt = req.cookies.LOGIN_DATA;
    const decoded = verify(jwt, process.env.JWT_SECRET);

    return { props: { LOGIN_DATA: decoded.LOGIN_DATA } };
  }
  else {
    return { props: { LOGIN_DATA: '' } };
  }
}
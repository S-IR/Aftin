import { NextPage } from 'next'
import React, { useState } from 'react'
import PrivateUploadComponent from './PrivateUploadComponent'
import Cookies from 'js-cookie';
import { object } from 'yup';
import Router from 'next/router';
import { verify } from 'jsonwebtoken';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Box } from '@mui/system';
import { UploadMenus, UploadUtensilsAndPlates, UploadDrinks, UploadFastFoods, UploadMainDishes, UploadSweetsAndDesserts, UploadIngredients, UploadFlyers, UploadLogos, UploadArtworks, UploadStickersAndCliparts, UploadBrochures, UploadOther } from '../../components/UploadImage';
import UploadBanners from '../../components/UploadImage/UploadBanners';


const imageCategories = ['Main Dishes', `Sweets & Desserts`, `Fast Foods`, `Drinks`, `Utensils & Plates`, `Ingredients`, `Menus`, `Banners`, `Flyers`, `Logos`, `Artworks`, `Stickers & Cliparts`, `Brochures`, `Other`]

const Index = (LOGIN_DATA: Object) => {

  const [typeOfImage, setTypeOfImage] = useState<null | typeof imageCategories[number]>(null)

  const switchImages = () => {
    switch (typeOfImage) {
      case `Main Dishes`:
        return <UploadMainDishes />
      case `Sweets & Desserts`:
        return <UploadSweetsAndDesserts />
      case `Fast Foods`:
        return <UploadFastFoods />
      case `Drinks`:
        return <UploadDrinks />
      case `UtensilsAndPlates`:
        return <UploadUtensilsAndPlates />
      case `Ingredients`:
        return <UploadIngredients />
      case `Menus`:
        return <UploadMenus />
      case `Banners`:
        return <UploadBanners />
      case `Flyers`:
        return <UploadFlyers />
      case `Logos`:
        return <UploadLogos />
      case `Artworks`:
        return <UploadArtworks />
      case `Stickers & Cliparts`:
        return <UploadStickersAndCliparts />
      case `Brochures`:
        return <UploadBrochures />
      case `Other`:
        return <UploadOther />
    }
  }
  const handleOptionChange = (e: SelectChangeEvent) => {
    setTypeOfImage(e.target.value as string)
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
            <InputLabel id="demo-simple-select-label">Image Category</InputLabel>
            <Select
              label="Image Category"
              onChange={handleOptionChange}
            >
              {imageCategories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}

            </Select >
          </FormControl>
        </Box>
        {switchImages()}
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
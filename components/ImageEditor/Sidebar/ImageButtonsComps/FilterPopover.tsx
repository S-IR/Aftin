import { Popover } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { determineSorts } from '../../../../model/SortingSidebar/determineSorts'
import { SMALL_CATEGORY_OF_IMG } from '../../../../typings/image-types/ImageTypes'
import { SortColor, SortOption } from '../../../SortingSidebar/index'

import { AspectRatio, Cake, Dashboard, DinnerDining, Fastfood, Flatware, LocalBar, MenuBook, OutdoorGrill, Palette, RamenDining, Restaurant, SoupKitchen, StickyNote2, Straighten, Tapas, Wallpaper } from '@mui/icons-material'

import { appetizerOptions, artworkStyleOptions, bannerTypeOptions, dishOptions, drinkOptions, fastFoodOptions, grDesStyleOptions, ingredientsOptions, logoOptions, materialOptions, menuSizeOptions, shapeOptions, sizeOptions, soupOptions, stickerOptions, surrEnvOptions, sweetOptions, utensilsOptions } from '../../../../constants/SortingSidebar'
interface props {
  open: boolean

  anchorEl: HTMLButtonElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  subCat: SMALL_CATEGORY_OF_IMG

}

const FilterPopover = ({ open, anchorEl, setAnchorEl, subCat }: props) => {
  const router = useRouter()
  const { paid, size, color_scheme, menu_size, appetizer_type, surr_env, dish_type, soup, fast_food_type, sweet_type, drink_type, utensil_type, material, ingredients, style, banner_type, artwork_style, sticker_category, shape } = useMemo(() => determineSorts(subCat), [subCat])

  return (
    <Popover
      id={"select-filter-popover"}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      transitionDuration={500}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <div className='w-auto h-[620px] bg-gray-900 text-white shadow-lg shadow-gray-900 m-2 '>
        {style &&
          <SortOption optionsArray={grDesStyleOptions} queryName={`style`} title={`Stylized For`} Icon={<Restaurant style={{ color: `red` }} />} />
        }
        {color_scheme &&
          <SortColor />
        }
        {surr_env &&
          <SortOption optionsArray={surrEnvOptions} queryName={`surr_env`} title={`Surrounding Environment`} Icon={<OutdoorGrill style={{ color: `yellow` }} />} />
        }
        {appetizer_type &&
          <SortOption optionsArray={appetizerOptions} queryName={`appetizer_type`} title={`Dish Type`} Icon={<Tapas style={{ color: `burlywood` }} />} />
        }
        {soup &&
          <SortOption optionsArray={soupOptions} queryName={`soup`} title={`Soup Type`} Icon={<SoupKitchen style={{ color: `yellow` }} />} />
        }
        {fast_food_type &&
          <SortOption optionsArray={fastFoodOptions} queryName={`fast_food_type`} title={`Fast Food Type`} Icon={<Fastfood style={{ color: `red` }} />} />
        }
        {material &&
          <SortOption optionsArray={materialOptions} queryName={`material`} title={`Material`} Icon={<Straighten style={{ color: `crimson` }} />} />
        }
        {sweet_type &&
          <SortOption optionsArray={sweetOptions} queryName={`sweet_type`} title={`Sweet Type`} Icon={<Cake style={{ color: `blue` }} />} />
        }
        {drink_type &&
          <SortOption optionsArray={drinkOptions} queryName={`drink_type`} title={`Drink Type`} Icon={<LocalBar style={{ color: `black` }} />} />
        }
        {utensil_type &&
          <SortOption optionsArray={utensilsOptions} queryName={`utensil_type`} title={`Utensil Type`} Icon={<Restaurant style={{ color: `brown` }} />} />
        }
        {ingredients &&
          <SortOption optionsArray={ingredientsOptions} queryName={`ingredients`} title={`Ingredients Used`} Icon={<RamenDining style={{ color: `orangered` }} />} />
        }
        {banner_type &&
          <SortOption optionsArray={bannerTypeOptions} queryName={`banner_type`} title={`Banner Type`} Icon={<Wallpaper style={{ color: `green` }} />} />
        }
        {artwork_style &&
          <SortOption optionsArray={artworkStyleOptions} queryName={`artwork_style`} title={`Artwork Style`} Icon={<Palette style={{ color: `snow` }} />} />
        }
        {sticker_category &&
          <SortOption optionsArray={stickerOptions} queryName={`sticker_category`} title={`Sticker Type`} Icon={<StickyNote2 style={{ color: `violet` }} />} />
        }

        {shape &&
          <SortOption optionsArray={shapeOptions} queryName={`shape`} title={`Shape`} Icon={<Dashboard style={{ color: `palevioletred` }} />} />
        }
        {dish_type &&
          <SortOption optionsArray={dishOptions} queryName={`dish_type`} title={`Dish Type`} Icon={<DinnerDining style={{ color: `darkred` }} />} />
        }
        {menu_size &&
          <SortOption optionsArray={menuSizeOptions} queryName={`menu_size`} title={`Menu Size`} Icon={<MenuBook style={{ color: `gold` }} />} />
        }
        {size &&
          <SortOption optionsArray={sizeOptions} queryName={`size`} title={`Size`} Icon={<AspectRatio style={{ color: `gold` }} />} />
        }

      </div>
    </Popover>
  )
}

export default FilterPopover
import { ArrowRightIcon, InboxIcon } from '@heroicons/react/solid'
import React, { useEffect, useMemo, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { MdExpandLess, MdOutlineDoubleArrow } from 'react-icons/md'
import { useSpring, animated, config } from 'react-spring'
import { BrandTailorModal } from './SortingSidebar/index'
import { SidebarSorts } from '../typings/typings'
import { restaurantType } from '../constants/SortingSidebar/restaurantTypes'
import { colorPallet } from '../constants/SortingSidebar/colorPallets'
import { ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText } from '@mui/material';
import { SortDrinkType, SortFastFoodType, SortIngredients, SortMainDishType, SortSoupType, SortSurrEnv, SortSweetsType, SortUtensilsType } from './SortingSidebar/For Stock Images'
import { fast_foods_array, ImgDoc } from '../typings/image-types/ImageTypes'
import { SortArtworkStyle, SortBannerType, SortLogoType, SortMenuSize, SortShape, SortStickersType, SortStyle } from './SortingSidebar/For Graphic Designs'
import { SortColor, SortSize, SortOption } from './SortingSidebar/index'
import { AspectRatio, Cake, Dashboard, DinnerDining, Fastfood, Flatware, LocalBar, MenuBook, OutdoorGrill, Palette, RamenDining, Restaurant, SoupKitchen, StickyNote2, Straighten, Tapas, Wallpaper } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { appetizerOptions, artworkStyleOptions, bannerTypeOptions, dishOptions, drinkOptions, fastFoodOptions, grDesStyleOptions, ingredientsOptions, logoOptions, materialOptions, menuSizeOptions, shapeOptions, sizeOptions, soupOptions, stickerOptions, surrEnvOptions, sweetOptions, utensilsOptions } from '../constants/SortingSidebar'
import { determineInputs } from '../model/f302b492-a403-4ac8-9745-c4db741051c9/determineInput'
import { determineSorts } from '../model/SortingSidebar/determineSorts'
import { isMobile } from 'react-device-detect';


interface props {
}

const SortingSidebar = ({ }: props) => {
  // These selected values also represent if the sort field exists. They are used as boolean checks

  const router = useRouter()
  const subCat = router.query.subCat

  const { paid, size, color_scheme, menu_size, appetizer_type, surr_env, dish_type, soup, fast_food_type, sweet_type, drink_type, utensil_type, material, ingredients, style, banner_type, artwork_style, sticker_category, logo_type, shape } = useMemo(() => determineSorts(subCat), [subCat])


  const [show, toggleSidebar] = useState(true)

  // if these fields exist, then display their corresponding component which sends them the currently selected value for that field

  //These are the basic filters



  return (
    <section className='sticky h-max w-auto scroll mr-2 mt-8 md:mt-0   '>
      {show ? <></> :
        <Tooltip title='Toggle sidebar' arrow >
          <button className={` ${show ? ` opacity-0` : ` opacity-1`} absolute top-0 left-0 transition-all duration-500 h-16 w-16 md:w-8 md:h-8  bg-stone-900 shadow-lg hover:bg-stone-500 `} onClick={() => toggleSidebar((v) => (!v))}>
            <MdOutlineDoubleArrow className='h-16 w-16 md:w-8 md:h-8' />
          </button>
        </Tooltip>
      }
      <animated.div className={`${show ? `left-0 opacity-1 w-[75vw] md:w-48` : `-left-52 opacity-0 w-[0px]`} transition-all duration-500 h-auto min-h-[100vh]  bg-[url('/frontend-used-images/SortingSidebar/SidebarBG.svg')] items-center flex flex-col relative `} >
        <Tooltip title='Toggle sidebar' arrow >
          <button className=' z-10 w-auto absolute top-3 -right-2 ' onClick={() => toggleSidebar((v) => (!v))}>
            <FaAngleDoubleLeft direction={'right'} className={'w-6 h-6'} />
          </button>
        </Tooltip>
        <div className='border-y-2 border-white/60 h-16 w-full flex items-center mt-3 '>
          <h2 className=' h-min  ml-3 font-serif text-white font-bold text-2xl md:text-xl  border-1 border-white/60   '>Filters</h2>
        </div>
        <List
          sx={{ width: '100%', maxWidth: 200 }}
          component="nav"
          aria-labelledby="Filter-Options"
        >
          {/* Depending on if the sent sort has a property, display the sorting component for that property */}
          {style &&
            <SortOption optionsArray={grDesStyleOptions} queryName={`style`} title={`Stylized For`} Icon={<Restaurant style={{ color: `red` }} />} />
          }
          {color_scheme &&
            //TODO
            <SortColor  />
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
          {logo_type &&
            <SortOption optionsArray={logoOptions} queryName={`logo_type`} title={`Logo Type`} Icon={<Flatware style={{ color: `coral` }} />} />
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
        </List>
      </animated.div>
    </section>

  )
}

export default SortingSidebar
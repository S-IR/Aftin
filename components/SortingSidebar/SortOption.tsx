import React, { ReactNode, useState } from 'react'
import { ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText, Collapse, Checkbox, ListItemAvatar, Avatar, SvgIconTypeMap } from '@mui/material';
import { InboxIcon } from '@heroicons/react/solid';
import { ExpandLess, ExpandMore, Restaurant, RestaurantMenu, RestaurantMenuOutlined, StarBorder } from '@mui/icons-material'
import { handleOptionClick } from '../../model/SortingSidebar/handleClick';
import { SortNestedOptionType, SortOptionType } from '../../typings/image-types/sortTypes';
import { useRouter } from 'next/router';
import { queryField } from '../../typings/image-types/queryTypes';
import SortNestedOption from './SortNestedOption';
import { isMobile } from 'react-device-detect';


interface props {
  optionsArray: SortOptionType[] | SortNestedOptionType[]
  title: string
  queryName: queryField
  Icon: JSX.Element
}

const SortOption = ({ optionsArray, title, queryName, Icon }: props) => {

  const router = useRouter()
  const currentlySelected = router.query[queryName]
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen((open) => (!open))


  return (
    <>
      <ListItemButton onClick={handleClick}
        className=' opacity-80 hover:opacity-100 w-16 h-32 md:h-auto  md:w-auto transition-all ease-in-out duration-300 rounded-lg'
      >
        <ListItemIcon  >
          {Icon as unknown as ReactNode}
        </ListItemIcon>
        <ListItemText primary={`${title}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {optionsArray.map((sortOption) => {

          //render each option
          // if the value is an array, that means that the option is a nested list
          if (typeof (sortOption.value) === `string`) {
            const isChecked = Array.isArray(currentlySelected) ? currentlySelected.includes(sortOption.value) : currentlySelected === sortOption.value

            return (
              <ListItemButton sx={{ pl: 4 }} key={sortOption.name}
                id={`${sortOption.value}`}
                // typescript is stupid and it should see sortOption.value must be a string from the enclosing if statement
                onClick={() => handleOptionClick(sortOption.value as string, `${queryName}`, router)}
                className={`translate-x-0 hover:translate-x-2 !transition-all !ease-in-out !duration-300   ${isChecked ? `bg-black` : `bg-none`} `}
              >
                <ListItemIcon>
                  {/* if the user device is not a phone and... */}
                  {!isMobile && <ListItemAvatar>
                    {/* if the img source is not null , display the respective avatar with the image. */}
                    {sortOption.imgSrc && <Avatar
                      alt={`template image for the ${sortOption.name} category`}
                      src={'/frontend-used-images/SortingSidebar/dish_type/sushi.png'}
                      className={`${isChecked ? `border-4 border-white/40 shadow-lg shadow-blue-200/30` : `border-none shadow-none`} transition-all ease-in-out duration-300 `}
                      id={`${sortOption.name}`}
                    ></Avatar>}
                  </ListItemAvatar>}
                </ListItemIcon>
                <ListItemText id={`${sortOption.name}`} primary={`${sortOption.name} `} className={`${isChecked ? `text-red-400/60` : `text-white`} !transition-all !duration-300 `} />
              </ListItemButton>
            )
          } else if (typeof (sortOption) === `object`) {
            return (
              <SortNestedOption key={sortOption.name} sortNestedOption={sortOption as SortNestedOptionType} queryName={queryName} />
            )
          }

        }
        )}
      </Collapse>
    </>
  )
}

export default SortOption
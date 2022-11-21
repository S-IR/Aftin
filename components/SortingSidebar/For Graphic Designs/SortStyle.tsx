import React, { useState } from 'react'
import { ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText, Collapse, Checkbox, ListItemAvatar, Avatar } from '@mui/material';
import { InboxIcon } from '@heroicons/react/solid';
import { ExpandLess, ExpandMore, Restaurant, RestaurantMenu, RestaurantMenuOutlined, StarBorder } from '@mui/icons-material'
import { SidebarSorts } from '../../../typings/typings';
import { restaurantType, restaurantTypes } from '../../../constants/SortingSidebar/restaurantTypes';
import { useRouter } from 'next/router';
import { gr_des_styles_type } from '../../../typings/image-types/ImageTypes';
import { grDesStyleOptions, grDesStyleType } from '../../../constants/SortingSidebar/grDesStyles';
import { handleOptionClick } from '../../../model/SortingSidebar/handleClick';
import  useNextQuery  from '../../../hooks/useNextQuery';


interface props {
}

const SortStyle = ({  }: props) => {
  const router = useRouter()
  const style = router.query.style
  
  const [open, setOpen] = useState(false)
  const [ethnicOpen, setEthnicOpen] = useState(false)
  const handleClick = () => setOpen((open) => (!open))
  const handeEthnicityClick = () => setEthnicOpen((open) => (!open))

  
  return (
    <>
      <ListItemButton onClick={handleClick}
        className={'hover:translate-x-1 transition-all duration-300 rounded-lg'}
      >
        <ListItemIcon>
          <Restaurant style={{ color: 'red' }} />
        </ListItemIcon>
        <ListItemText primary="Type of restaurant " />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {grDesStyleOptions.map((grDesStyleOption: grDesStyleType) => {
          //render each option.
          // if the value is an array, that means that the option is a nested list
          if (typeof (grDesStyleOption.value) !== `object`) {
            const isChecked = style? style.includes(grDesStyleOption.value): null
            return (
              <ListItemButton sx={{ pl: 4 }} key={grDesStyleOption.name}
                id={`${grDesStyleOption.value}`}
                onClick={() => handleOptionClick(grDesStyleOption.value, `banner_type`, router)}
                className={`${isChecked ? `bg-gray-700/40` : `bg-none`} transition-all duration-500`}
              >
                <ListItemIcon>
                  <ListItemAvatar>
                    {/* if the img source is not null, display the avatar with it. */}
                    {grDesStyleOption.imgSrc && <Avatar
                      alt={`template image for the ${grDesStyleOption.name} category`}
                      src={grDesStyleOption.imgSrc}
                      className={`${isChecked ? `border-4 border-white/40 shadow-lg shadow-blue-200/30` : `border-none shadow-none`} transition-all ease-in-out duration-300 `}
                      id={`${grDesStyleOption.name}`}
                    />}
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText id={`${grDesStyleOption.name}`} primary={`${grDesStyleOption.name}`} />
              </ListItemButton>
            )
          } else {
            return (
              <>
                <ListItemButton onClick={handeEthnicityClick}
                  className={'hover:translate-x-1 transition-all duration-300 rounded-lg'}
                >
                  <ListItemIcon>
                    <Restaurant style={{ color: 'red' }} />
                  </ListItemIcon>
                  <ListItemText primary={grDesStyleOption.name} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={ethnicOpen} timeout="auto" unmountOnExit  >
                  {grDesStyleOption.value?.map((country: gr_des_styles_type) => {
                    const isChecked = style.includes(country.value)
                    return (
                      <ListItemButton sx={{ pl: 4 }} key={country.name}
                        id={`${country.value}`}
                        onClick={() => handleOptionClick(country.value as string, `style`, router)}
                        className={`${isChecked ? `bg-gray-700/40` : `bg-none`} transition-all duration-500`}
                      >
                        <ListItemIcon>
                          <ListItemAvatar>
                            <Avatar
                              alt={`template image for the ${country.name} category`}
                              src={country.imgSrc}
                              className={`${isChecked ? `border-4 border-white/40 shadow-lg shadow-blue-200/30` : `border-none shadow-none`} transition-all ease-in-out duration-300 `}
                              id={`${country.name}`}
                            />
                          </ListItemAvatar>
                        </ListItemIcon>
                        <ListItemText id={`${country.name}`} primary={`${country.name}`} />
                      </ListItemButton>
                    )

                  })
                  }
                </Collapse>
              </>
            )
          }

        }
        )}
      </Collapse>
    </>
  )
}

export default SortStyle
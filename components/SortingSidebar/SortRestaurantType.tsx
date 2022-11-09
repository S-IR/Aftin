import React, { useState } from 'react'
import { ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText, Collapse, Checkbox, ListItemAvatar, Avatar } from '@mui/material';
import { InboxIcon } from '@heroicons/react/solid';
import { ExpandLess, ExpandMore, Restaurant, RestaurantMenu, RestaurantMenuOutlined, StarBorder } from '@mui/icons-material'
import { restaurantType, restaurantTypes } from '../../constants/SortingSidebar/restaurantTypes';
import { SidebarSorts } from '../../typings/typings';
import { MdRestaurantMenu } from 'react-icons/md';
import { handleOptionClick } from '../../model/SortingSidebar/handleClick';


interface props {
  selectedRestaurantType: string | undefined
  setSorts: React.Dispatch<React.SetStateAction<SidebarSorts>>
}

const SortRestaurantType = ({ selectedRestaurantType, setSorts }: props) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen((open) => (!open))
  const handleOptionClick = (value: string) => setSorts(sorts => ({...sorts, restaurantType : value}))

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
        {restaurantTypes.map((restaurantType: restaurantType) => {
          //render each option.
          const isChecked = selectedRestaurantType === restaurantType.restaurantType
          return (
            <ListItemButton sx={{ pl: 4 }} key={restaurantType.restaurantType}
              id={`${restaurantType.restaurantType}`}
              onClick={() => handleOptionClick( restaurantType.restaurantType)}
              className={`${isChecked? `bg-gray-700/40` : `bg-none`} transition-all duration-500`}
            >
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar
                    alt={`image of ${restaurantType.restaurantType}`}
                    src={`/frontend-used-images/PremiumIcon.png`}
                    className={`${isChecked ?  `border-4 border-white/40 shadow-lg shadow-blue-200/30` : `border-none shadow-none`} transition-all ease-in-out duration-300 `}
                    id={`${restaurantType.restaurantType}`}
                  />
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText id={`${restaurantType.restaurantType}`} primary={`${restaurantType.restaurantType}`} />
            </ListItemButton>
          )
        }
        )}
      </Collapse>
    </>
  )
}

export default SortRestaurantType
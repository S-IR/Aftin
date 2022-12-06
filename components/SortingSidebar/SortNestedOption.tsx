import React, { FC, useState } from 'react'
import { ListItemButton, List, Tooltip, ListSubheader, ListItemIcon, ListItemText, Collapse, Checkbox, ListItemAvatar, Avatar } from '@mui/material';
import { ExpandLess, ExpandMore, Restaurant, RestaurantMenu, RestaurantMenuOutlined, StarBorder } from '@mui/icons-material'
import { useRouter } from 'next/router';
import { queryField } from '../../typings/image-types/queryTypes';
import { handleOptionClick } from '../../model/SortingSidebar/handleClick';


interface props {
  sortNestedOption: {
    name: string;
    imgSrc: string | null;
    value: {
      name: string;
      imgSrc: string | null;
      value: string | null;
    }[] | null;
  }
  queryName: queryField
}

const SortNestedOption: FC<props> = ({ sortNestedOption, queryName }) => {
  const router = useRouter()
  const currentlySelected = router.query[queryName]

  const [open, setOpen] = useState(false)
  return (
    <>
      <ListItemButton onClick={() => setOpen((boolean) => (!boolean))}
        className={'hover:translate-x-1 !transition-all !duration-300 rounded-lg'}
      >
        <ListItemIcon>
          {/* TODO DETERMINE THE ICON THAT SHOULD BE DISPLAYED  */}
          <Restaurant style={{ color: 'red' }} />
        </ListItemIcon>
        <ListItemText primary={sortNestedOption.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit  >
        {sortNestedOption.value?.map((NestedOption) => {
          const isChecked = Array.isArray(currentlySelected) ? currentlySelected.includes(NestedOption.value as string) : currentlySelected === NestedOption.value
          return (
            <ListItemButton sx={{ pl: 4 }} key={NestedOption.name}
              id={`${NestedOption.value}`}
              onClick={() => handleOptionClick(NestedOption.value as string, `${queryName}`, router)}
              className={`${isChecked ? `bg-gray-700/40` : `bg-none`} translate-x-2 hover:translate-x-4 !transition-all !ease-in-out !duration-300`}
            >
              <ListItemIcon>
                <ListItemAvatar>
                  <Avatar
                    alt={`template image for the ${NestedOption.name} category`}
                    src={NestedOption.imgSrc}
                    className={`${isChecked ? `border-4 border-white/40 shadow-lg shadow-blue-200/30` : `border-none shadow-none`} !transition-all !ease-in-out !duration-300 `}
                    id={`${NestedOption.name}`}
                  />
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText id={`${NestedOption.name}`} primary={`${NestedOption.name}`} />
            </ListItemButton>
          )
        })
        }
      </Collapse>
    </>
  )
}

export default SortNestedOption
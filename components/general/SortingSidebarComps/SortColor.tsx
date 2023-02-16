import React, { useState } from "react";
import { HTMLHexColor, SidebarSorts } from "../../../typings/typings";
import {
  ListItemButton,
  List,
  Tooltip,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { ColorLens } from "@mui/icons-material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  colorPallet,
  colorPallets,
} from "../../../constants/SortingSidebar/colorPallets";
import { CirclePicker, Color, HuePicker, SliderPicker } from "react-color";
import { useRouter } from "next/router";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";

interface props {}

const SortColor = ({}: props) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((open) => !open);
  const color: string = router.query.color;

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        className={
          "rounded-lg opacity-80  !transition-all !duration-300 hover:opacity-100"
        }
      >
        <ListItemIcon>
          <ColorLens style={{ color: "gold", width: 32, height: 32 }} />
        </ListItemIcon>
        <ListItemText primary="Predominant colors " />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        sx={{ marginLeft: "10px" }}
      >
        <CirclePicker
          color={color}
          width={196}
          circleSize={34}
          onChangeComplete={(color) => {
            const value = `${color.rgb.r}-${color.rgb.g}-${color.rgb.b}`;

            return handleOptionClick(value, `color`, router);
          }}
        />

        {/* {colorPallets.map((colorPallet: colorPallet) => {
          //render each option.
          const isChecked = selectedColorPallet === colorPallet.colorPalletName
          return (
            <ListItemButton sx={{ pl: 4 }} key={colorPallet.colorPalletName}
              id={`${colorPallet.colorPallet}`}
              onClick={() => {
                if(colorPallet.colorPalletName === 'Custom') 
                return handleOptionClick({colorPalletName: `Custom`, colors: colorPallet.colorPallet})
                return handleOptionClick(colorPallet.colorPalletName)
              }

                }
              className={`${isChecked ? `bg-gray-700/40` : `bg-none`} transition-all duration-500`}
            >
              <ListItemIcon>
                <ListItemAvatar>
                  {/* These are the colors to be shown on the side of the category */}
        {/* {colorPallet.colorPallet !== undefined &&
                    <Avatar
                      alt={`color pallet for food called${colorPallet.colorPalletName}`}
                      src={colorPallet.imgSrc}
                      className={`${isChecked ? `border-4 border-white/40 shadow-lg shadow-blue-200/30` : `border-none shadow-none`} transition-all ease-in-out duration-300 w-12 h-12 `}
                      id={`${colorPallet.colorPalletName}`}
                    />
                  }
                </ListItemAvatar>
              </ListItemIcon>
              <ListItemText id={`${colorPallet.colorPalletName}`} primary={`${colorPallet.colorPalletName}`} />
            </ListItemButton >
          )
        }
        )} } */}
      </Collapse>
    </>
  );
};

export default SortColor;

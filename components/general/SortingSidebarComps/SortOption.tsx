import React, { ReactNode, useState } from "react";
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
  SvgIconTypeMap,
} from "@mui/material";
import { InboxIcon } from "@heroicons/react/solid";
import {
  ExpandLess,
  ExpandMore,
  Restaurant,
  RestaurantMenu,
  RestaurantMenuOutlined,
  StarBorder,
} from "@mui/icons-material";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";
import {
  SortNestedOptionType,
  SortOptionType,
} from "../../../typings/image-types/sortTypes";
import { useRouter } from "next/router";
import { queryField } from "../../../typings/image-types/queryTypes";
import SortNestedOption from "./SortNestedOption";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { query } from "firebase/firestore";

interface props {
  optionsArray: SortOptionType[] | SortNestedOptionType[];
  title: string;
  queryName: queryField;
  Icon: JSX.Element;
  isThirdDegreeCategory?: boolean;
}

/**
 * Displays a sort option for an images in the image gallery
 */
const SortOption = ({
  optionsArray,
  title,
  queryName,
  Icon,
  isThirdDegreeCategory,
}: props) => {
  const router = useRouter();

  const currentlySelected = router.query[queryName] as string | undefined;

  const [open, setOpen] = useState(false);
  //manages gtag event firing. When a click happens the event will fire and will set this variable to false. From now on the event will not fire. It is meant to stop tracking multiple click events on a sort option
  const [sendEvent, setSendEvent] = useState(true);

  const handleClick = () => setOpen((open) => !open);

  const thirdDegreePathname = `${router.pathname.replace(
    "[...imageCategory]",
    //ignore ts, image category cannot be undefined as the server would return a 404 page
    router.query.imageCategory[0]
  )}`;

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        className=" h-32 w-16 rounded-lg opacity-80 !transition-all  !duration-300 !ease-in-out  hover:opacity-100 md:h-auto md:w-auto"
      >
        <ListItemIcon>{Icon as unknown as ReactNode}</ListItemIcon>
        <ListItemText primary={`${title}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {optionsArray.map((sortOption) => {
          //render each option
          // if the value is an array, that means that the option is a nested list
          if (typeof sortOption.value === `string`) {
            //boolean to put specific styles on the checked sorting options
            let isChecked: boolean;
            if (isThirdDegreeCategory) {
              isChecked =
                //ignore ts, image category cannot be undefined as the server would return a 404 page
                router.query.imageCategory.length > 1
                  ? router.query.imageCategory[1] == sortOption.value
                  : false;
            } else {
              isChecked =
                currentlySelected !== undefined &&
                currentlySelected.includes(sortOption.value);
            }
            return (
              <ConditionalWrapper
                key={sortOption.name}
                condition={isThirdDegreeCategory === true}
                wrapper={(children: JSX.Element) => (
                  <Link href={`${thirdDegreePathname}/${sortOption.value}`}>
                    {children}
                  </Link>
                )}
              >
                <ListItemButton
                  sx={{ pl: 4 }}
                  key={sortOption.name}
                  id={`${sortOption.value}`}
                  onClick={() => {
                    if (sendEvent) {
                      window.gtag("event", "sorting_option_clicked", {
                        sort_option_name: title,
                      });
                      setSendEvent(false);
                    }
                    handleOptionClick(
                      sortOption.value as string,
                      `${queryName}`,
                      router,
                      isThirdDegreeCategory
                    );
                  }}
                  className={` !transition-all !duration-300 !ease-in-out hover:translate-x-2   ${
                    isChecked ? `bg-black` : `bg-none`
                  } `}
                >
                  <ListItemIcon>
                    {/* if the user device is not a phone and... */}
                    <ListItemAvatar>
                      {/* if the img source is not null , display the respective avatar with the image. */}
                      {sortOption.imgSrc && (
                        <Avatar
                          alt={`template image for the ${sortOption.name} category`}
                          src={"/SortingSidebar/dish_type/sushi.png"}
                          className={`${
                            isChecked
                              ? `border-4 border-white/40 shadow-lg shadow-blue-200/30`
                              : `border-none shadow-none`
                          } transition-all duration-300 ease-in-out `}
                          id={`${sortOption.name}`}
                        ></Avatar>
                      )}
                    </ListItemAvatar>
                  </ListItemIcon>
                  <ListItemText
                    id={`${sortOption.name}`}
                    primary={`${sortOption.name} `}
                    className={`${
                      isChecked ? `text-red-400/60` : `text-white`
                    } !transition-all !duration-300 `}
                  />
                  ` `
                </ListItemButton>
              </ConditionalWrapper>
            );
          } else if (typeof sortOption === `object`) {
            return (
              <SortNestedOption
                key={sortOption.name}
                sortNestedOption={sortOption as SortNestedOptionType}
                queryName={queryName}
                isThirdDegreeCategory={isThirdDegreeCategory}
                thirdDegreePathname={thirdDegreePathname}
              />
            );
          }
        })}
      </Collapse>
    </>
  );
};

export default SortOption;

interface conditionalProps {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}
const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: conditionalProps) => (condition ? wrapper(children) : children);

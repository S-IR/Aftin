import React, { FC, useState } from "react";
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
import {
  ExpandLess,
  ExpandMore,
  Restaurant,
  RestaurantMenu,
  RestaurantMenuOutlined,
  StarBorder,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { queryField } from "../../../typings/image-types/queryTypes";
import { handleOptionClick } from "../../../model/client-side/SortingSidebar/handleClick";
import { SortNestedOptionType } from "../../../typings/image-types/sortTypes";
import Link from "next/link";

interface props {
  sortNestedOption: SortNestedOptionType;
  queryName: queryField;
  isThirdDegreeCategory?: boolean;
  thirdDegreePathname?: string;
}

/**
 * Displays a nested sort option for the images in the website gallery sections
 * @param param0
 * @returns
 */
const SortNestedOption: FC<props> = ({
  sortNestedOption,
  queryName,
  isThirdDegreeCategory,
  thirdDegreePathname,
}) => {
  const router = useRouter();
  const currentlySelected = router.query[queryName];

  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItemButton
        onClick={() => setOpen((boolean) => !boolean)}
        className={
          "rounded-lg !transition-all !duration-300 hover:translate-x-1"
        }
      >
        <ListItemIcon>
          <Avatar
            alt={`template image for the ${sortNestedOption.name} category`}
            src={sortNestedOption.imgSrc as string}
            id={`${sortNestedOption.name}`}
          />
        </ListItemIcon>
        <ListItemText primary={sortNestedOption.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {sortNestedOption.value?.map((NestedOption) => {
          const isChecked = Array.isArray(currentlySelected)
            ? currentlySelected.includes(NestedOption.value as string)
            : currentlySelected === NestedOption.value;
          return (
            <ConditionalWrapper
              condition={!!isThirdDegreeCategory}
              key={NestedOption.name}
              wrapper={(children: JSX.Element) => (
                <Link href={`${thirdDegreePathname}/${NestedOption.value}`}>
                  {children}
                </Link>
              )}
            >
              <ListItemButton
                sx={{ pl: 4 }}
                key={NestedOption.name}
                id={`${NestedOption.value}`}
                onClick={() =>
                  handleOptionClick(
                    NestedOption.value as string,
                    `${queryName}`,
                    router,
                    isThirdDegreeCategory
                  )
                }
                className={`${
                  isChecked ? `bg-gray-700/40` : `bg-none`
                } translate-x-2 !transition-all !duration-300 !ease-in-out hover:translate-x-4`}
              >
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar
                      alt={`template image for the ${NestedOption.name} category`}
                      src={NestedOption.imgSrc as string}
                      className={`${
                        isChecked
                          ? `border-4 border-white/40 shadow-lg shadow-blue-200/30`
                          : `border-none shadow-none`
                      } !transition-all !duration-300 !ease-in-out `}
                      id={`${NestedOption.name}`}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  id={`${NestedOption.name}`}
                  primary={`${NestedOption.name}`}
                />
              </ListItemButton>
            </ConditionalWrapper>
          );
        })}
      </Collapse>
    </>
  );
};

export default SortNestedOption;

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

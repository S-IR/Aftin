import { string } from "yup";
import { gr_des_style_array } from "../../typings/image-types/ImageTypes";
import { SortOptionType } from "../../typings/image-types/sortTypes";

const grDesStyleOptions: SortOption[] = [
  {
    name: "Diners",
    imgSrc: "/SortingSidebar/Graphic Design Styles/diner.png",
    value: `diner`,
  },
  {
    name: "Fine Dining",
    imgSrc: "/SortingSidebar/Graphic Design Styles/fine-dining.png",
    value: `fine-dining`,
  },
  {
    name: "Bars",
    imgSrc: "/SortingSidebar/Graphic Design Styles/bar.png",
    value: `bar`,
  },
  {
    name: "Cafeterias",
    imgSrc: "/SortingSidebar/Graphic Design Styles/cafeteria.png",
    value: `cafeteria`,
  },
  {
    name: "Family Restaurant",
    imgSrc: "/SortingSidebar/Graphic Design Styles/family-restaurant.png",
    value: `family-restaurant`,
  },
  {
    name: "Pizzeria",
    imgSrc: "/SortingSidebar/Graphic Design Styles/pizzeria.png",
    value: `pizzeria`,
  },
  {
    name: `Ethnic`,
    imgSrc: null,
    value: [
      {
        name: `Italian`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/italian.png",
        value: `italian`,
      },
      {
        name: `Japanese`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/japanese.png",
        value: `japanese`,
      },
      {
        name: `French`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/french.png",
        value: `french`,
      },
      {
        name: `Indian`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/indian.png",
        value: `indian`,
      },
      {
        name: `Greek`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/greek.png",
        value: `greek`,
      },
      {
        name: `thai`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/thai.png",
        value: `thai`,
      },
      {
        name: `Mexican`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/mexican.png",
        value: `mexican`,
      },
      {
        name: `chinese`,
        imgSrc: "/SortingSidebar/Graphic Design Styles/Ethnic/chinese.png",
        value: `chinese`,
      },
      {
        name: `Middle Eastern`,
        imgSrc:
          "/SortingSidebar/Graphic Design Styles/Ethnic/middle-eastern.png",
        value: `middle eastern`,
      },
    ],
  },
];

export default grDesStyleOptions;

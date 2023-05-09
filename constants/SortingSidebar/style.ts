import { gr_des_style_array } from "../../typings/image-types/ImageTypes";
import { SortOptionType } from "../../typings/image-types/sortTypes";

const grDesStyleOptions: SortOptionType[] = [
  {
    name: "Diners",
    imgSrc: "/SortingSidebar/gr_des_styles/diner.png",
    value: `diner`,
  },
  {
    name: "Fine Dining",
    imgSrc: "/SortingSidebar/gr_des_styles/fine-dining.png",
    value: `fine-dining`,
  },
  {
    name: "Bars",
    imgSrc: "/SortingSidebar/gr_des_styles/bar.png",
    value: `bar`,
  },
  {
    name: "Cafeterias",
    imgSrc: "/SortingSidebar/gr_des_styles/cafeteria.png",
    value: `cafeteria`,
  },
  {
    name: "Family Restaurant",
    imgSrc: "/SortingSidebar/gr_des_styles/family-restaurant.png",
    value: `family-restaurant`,
  },
  {
    name: "Pizzeria",
    imgSrc: "/SortingSidebar/gr_des_styles/pizzeria.png",
    value: `pizzeria`,
  },
  {
    name: `Ethnic`,
    imgSrc: null,
    value: [
      {
        name: `Italian`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/italian.png",
        value: `italian`,
      },
      {
        name: `Japanese`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/japanese.png",
        value: `japanese`,
      },
      {
        name: `French`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/french.png",
        value: `french`,
      },
      {
        name: `Indian`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/indian.png",
        value: `indian`,
      },
      {
        name: `Greek`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/greek.png",
        value: `greek`,
      },
      {
        name: `thai`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/thai.png",
        value: `thai`,
      },
      {
        name: `Mexican`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/mexican.png",
        value: `mexican`,
      },
      {
        name: `chinese`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/chinese.png",
        value: `chinese`,
      },
      {
        name: `Middle Eastern`,
        imgSrc: "/SortingSidebar/gr_des_styles/Ethnic/middle-eastern.png",
        value: `middle eastern`,
      },
    ],
  },
];

export default grDesStyleOptions;

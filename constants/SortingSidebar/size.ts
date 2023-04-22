import { SortOptionType } from "../../typings/image-types/sortTypes";

const sizeOptions: SortOption[] = [
  {
    name: "Small (around 256 X 256)",
    imgSrc: "/SortingSidebar/size/small.png",
    value: `small`,
  },
  {
    name: "Medium (around 512x512)",
    imgSrc: "/SortingSidebar/size/medium.png",
    value: `medium`,
  },
  {
    name: "HD (around 1280x720)",
    imgSrc: "/SortingSidebar/size/HD.png",
    value: `HD`,
  },
  {
    name: "HDTV (around 1920x1080)",
    imgSrc: "/SortingSidebar/size/HDTV.png",
    value: `HDTV`,
  },
  {
    name: "4K or more",
    imgSrc: "/SortingSidebar/size/4K+.png",
    value: `4K+`,
  },
];

export default sizeOptions;

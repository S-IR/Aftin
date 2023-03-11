import { SortOptionType } from "../../typings/image-types/sortTypes";

const sizeOptions: SortOption[] = [
  {
    name: "Small (around 256 X 256)",
    imgSrc: "/frontend-used-images/SortingSidebar/size/small.png",
    value: `small`,
  },
  {
    name: "Medium (around 512x512)",
    imgSrc: "/frontend-used-images/SortingSidebar/size/medium.png",
    value: `medium`,
  },
  {
    name: "HD (around 1280x720)",
    imgSrc: "/frontend-used-images/SortingSidebar/size/HD.png",
    value: `HD`,
  },
  {
    name: "HDTV (around 1920x1080)",
    imgSrc: "/frontend-used-images/SortingSidebar/size/HDTV.png",
    value: `HDTV`,
  },
  {
    name: "4K or more",
    imgSrc: "/frontend-used-images/SortingSidebar/size/4K+.png",
    value: `4K+`,
  },
];

export default sizeOptions;

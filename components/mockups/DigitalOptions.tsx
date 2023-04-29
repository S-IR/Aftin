// import React from "react";
// import Popover from "@mui/material/Popover";
// import {
//   dayCategories,
//   digitalCategories,
//   MockupType,
//   previewCategoryType,
//   previewCategoryValues,
// } from "../../constants/mockups/previewCategories";
// import Image from "next/legacy/image";
// import { previewSelectedCategory } from "../../pages/restaurant-mockups";
// import { isMobile } from "react-device-detect";
// import Link from "next/link";

// interface props {
//   open: boolean;
//   anchorEl: HTMLButtonElement | null;
//   setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
//   mockupType: MockupType | null;
// }
// const DigitalOptions = ({ open, anchorEl, setAnchorEl, mockupType }: props) => {
//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={() => setAnchorEl(null)}
//       transitionDuration={500}
//       anchorOrigin={{
//         vertical: "center",
//         horizontal: "right",
//       }}
//     >
//       <div className="grid h-auto w-auto grid-cols-3 items-center justify-center     bg-gray-800  align-middle  shadow-lg shadow-black ">
//         {digitalCategories.map((digitalCategory) => {
//           const selected = mockupType === digitalCategory.value;

//           return (
//             <Link
//               href={`/restaurant-mockups/${digitalCategory.value}`}
//               key={digitalCategory.value}
//               legacyBehavior>
//               <div className=" group relative  flex h-48 w-48 cursor-pointer flex-col items-center justify-center space-y-4  align-middle transition-all duration-300  ">
//                 <Image
//                   src={digitalCategory.source}
//                   layout={"fill"}
//                   alt={`preview image for ${digitalCategory.name}`}
//                   className={
//                     "absolute top-0 left-0 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
//                   }
//                 />
//                 <button
//                   className={`webkit !m-0 h-16 w-36 rounded-l-md rounded-r-md stroke-black font-serif  text-2xl  drop-shadow-2xl transition-all duration-300 hover:border-gray-300  ${
//                     selected ? `text-orange-500` : `text-white`
//                   } transition-all duration-300 `}
//                 >
//                   {digitalCategory.name}
//                 </button>
//               </div>
//             </Link>
//           );
//         })}
//       </div>
//     </Popover>
//   );
// };

// export default DigitalOptions;

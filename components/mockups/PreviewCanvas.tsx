// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   previewPhone,
//   mockupTemplate,
// } from "../../constants/mockups/mockupTemplates";
// import PreviewImg from "./PreviewImg";
// import PreviewElement from "./PreviewElement";
// import {
//   Stage as KonvaStage,
//   Layer,
//   Rect,
//   KonvaNodeComponent,
// } from "react-konva";
// import { useMockupsStore } from "../../zustand/MockupsStore/store";
// import { previewSelectedCategory } from "../../pages/restaurant-mockups";
// import { animated, useSpringRef, useTransition } from "react-spring";
// import { Spring } from "@react-spring/konva";
// import Image from "next/image";
// import { isMobile } from "react-device-detect";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
// import { MockupType } from "../../constants/mockups/previewCategories";
// import { determineMockupImg } from "../../model/client-side/mockups/determineMockupImg";

// interface props {
//   mockupType: MockupType;
// }

// /**
//  * This component is meant to be a canvas but due to the complexity of achieving a proper smart mockup being too big for now it is only a set of images
//  * @param param0
//  * @returns
//  */
// const PreviewCanvas = ({ mockupType }: props) => {
//   const [images, currentlyPreviewed] = useMockupsStore((state) => [
//     state.images,
//     state.currentlyPreviewed,
//   ]);

//   const placementData = useMemo(
//     () => determineMockupImg(mockupType),
//     [mockupType]
//   );

//   placementData.src = images[currentlyPreviewed as number].url;
//   const [backgroundIndex, setBackgroundIndex] = useState(0);
//   const transRef = useSpringRef();
//   const transitions = useTransition(backgroundIndex, {
//     ref: transRef,
//     keys: null,
//     from: { opacity: 0, transform: "translate3d(0,25%,0)" },
//     enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
//     leave: { opacity: 0, transform: "translate3d(0,-10%,0)" },
//   });

//   useEffect(() => {
//     transRef.start();
//   }, [backgroundIndex]);
//   if (placementData === null) {
//     return <></>;
//   }
//   return (
//     <section
//       className="relative flex items-start justify-center rounded-xl bg-yellow-800/40 p-2  "
//       //width and height are the maximum mockup size (max width is 1536, max height is 1024) + 32px height for the button
//       style={{
//         width: isMobile ? 1536 / 2 : 1536,
//         height: isMobile ? (768 + 32) / 2 : 1024 + 32,
//       }}
//     >
//       <div
//         className="absolute top-0 flex h-8 translate-y-2 items-center justify-center  align-middle "
//         style={{
//           transform: `translateY(${isMobile ? 1536 / 8 : 1536 / 4})`,
//           width: isMobile ? 1536 / 16 : 1536 / 8,
//         }}
//       >
//         <button
//           className=" z-10 mx-auto h-8 w-8 rounded-full bg-gray-500 transition-all duration-300 hover:bg-gray-700 disabled:bg-black  "
//           disabled={backgroundIndex === 0}
//           onClick={() => setBackgroundIndex((v) => v - 1)}
//         >
//           <KeyboardArrowLeft />
//         </button>
//         <button
//           className="z-10 mx-auto h-8 w-8 rounded-full bg-gray-500 transition-all duration-300 hover:bg-gray-700 disabled:bg-black  "
//           disabled={backgroundIndex === 4}
//           onClick={() => setBackgroundIndex((v) => v + 1)}
//         >
//           <KeyboardArrowRight />
//         </button>
//       </div>

//       <section
//         style={{
//           width: isMobile ? 960 : 1280,
//           height: isMobile ? 540 : 720,
//           position: "relative",
//         }}
//       >
//         {transitions((styles, i) => {
//           const bg = placementData.placement[i].bg;
//           const sentImg = placementData.placement[i].sentImg;

//           return (
//             <>
//               <animated.div
//                 style={styles}
//                 className={
//                   "absolute top-0 left-0  flex h-auto w-auto justify-center p-2 pt-10 "
//                 }
//               >
//                 <Image
//                   style={{
//                     position: "absolute",
//                     top: sentImg.y,
//                     left: sentImg.x,
//                     transform: `rotate3d(1, 1, 1, 45deg)`,
//                   }}
//                   src={placementData.src as string}
//                   width={sentImg.w}
//                   height={sentImg.h}
//                   alt="the user's previewed image"

//                   //ROTATION TODO
//                 />
//                 <img
//                   src={bg.src}
//                   width={bg.w}
//                   height={bg.h}
//                   alt={"mockup background"}
//                   className="z-50"
//                 />
//               </animated.div>
//             </>
//           );
//         })}
//       </section>
//     </section>
//   );
// };

// export default PreviewCanvas;

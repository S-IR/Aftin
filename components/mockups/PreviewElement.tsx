// import React, { LegacyRef, useEffect, useRef } from "react";
// import {
//   mockupBg,
//   sentImgPlacement,
// } from "../../constants/mockups/mockupTemplates";
// import { Transformer } from "react-konva";
// import { ImageConfig } from "next/dist/shared/lib/image-config";
// import { animated } from "react-spring";
// import NextImage from "next/image";

// interface props {
//   src: undefined | string | Blob | Url;
//   placementData: sentImgPlacement;
// }

// const PreviewElement = ({ src, placementData }: props) => {
//   const imageRef = useRef<HTMLImageElement | null>(null);

//   return (
//     <NextImage
//       style={{
//         position: "absolute",
//         top: placementData.y,
//         left: placementData.x,
//       }}
//       src={src}
//       ref={imageRef}
//       width={placementData.w}
//       height={placementData.h}
//       alt="the user's previewed image"
//       //ROTATION TODO
//     />
//   );
// };

// export default PreviewElement;

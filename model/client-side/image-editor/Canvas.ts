import { Filter } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";
import { NextRouter } from "next/router";
import { KonvaNodeComponent, StageProps } from "react-konva";
import { selectElement } from "../../../zustand/CanvasStore/store";
import { addImage } from "../../../zustand/MockupsStore/store";
import { LegacyRef } from "react";

/**
 * Quickly downloads an image based on the uri
 * @param uri the uri of the image
 */
export function downloadURI(uri: string) {
  var link = document.createElement("a");
  link.download = "";
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports the canvas in the image editor to a set of png images to be downloaded
 * @param SELECT_ELEMENT The select element function of the canvas. Used in order to deselect the canvas before exporting in order to remove any selection borders before exporting
 * @param stageRefs all of the stage refs of the canvas that is going to be exported
 * @param pageToDownload the id of the page in the canvas that needs to be downloaded or the string "all" in order to download every single page
 */
export const handleExport = (
  SELECT_ELEMENT: selectElement,
  stageRefs: LegacyRef<Stage>[],
  pageToDownload: number | "all"
) => {
  SELECT_ELEMENT(null, null);
  if (pageToDownload === "all") {
    stageRefs.forEach((stageRef) => {
      if (!stageRef.current) return;
      const uri = stageRef.current.toDataURL();
      return downloadURI(uri);
    });
  } else {
    const uri = stageRefs[pageToDownload].current.toDataURL();
    return downloadURI(uri);
  }
};
/**
 * Handles the onClick event on the preview button on the image-editor section. Takes the current edited canvas page or all of the pages, transforms them into an image and places them in the preview global state.
 * @param router the next router, used to push the user
 * @param SELECT_ELEMENT function used to deselect the canvas page. This is used in order to not have the select edges on the final preview sent image
 * @param ADD_IMAGE Adds the image to the preview global state
 * @param stageRefs The stageRef of the canvas
 * @param pageToPreview The index of the currently viewed page
 * @returns Sends the user to /restaurant-mockups
 */
export const handlePreview = async (
  router: NextRouter,
  SELECT_ELEMENT: selectElement,
  ADD_IMAGE: addImage,
  stageRefs: LegacyRef<Stage>[],
  pageToPreview: number | "all"
) => {
  SELECT_ELEMENT(null, null);
  if (pageToPreview === "all") {
    stageRefs.forEach((stageRef) => {
      if (!stageRef.current) return;
      let img = stageRef.current.toDataURL();
      const w = stageRef.current.width();
      const h = stageRef.current.height();
      ADD_IMAGE(img, w, h);
    });
  } else {
    const stageRef = stageRefs[pageToPreview];
    if (!stageRef.current) return;
    const img = stageRef.current.toDataURL();
    const w = stageRef.current.width();
    const h = stageRef.current.height();
    ADD_IMAGE(img, w, h);
  }

  return router.push(`/restaurant-mockups`);
};

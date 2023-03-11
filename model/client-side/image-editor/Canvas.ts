import { Filter } from "konva/lib/Node";
import { Stage } from "konva/lib/Stage";
import { NextRouter } from "next/router";
import { KonvaNodeComponent, StageProps } from "react-konva";
import { canvasPagesActions } from "../../../features/canvasPages/canvas-elements/canvasPageSlice";
import { filtersActions } from "../../../features/canvasPages/canvas-elements/filtersHandlingReducers";
import { previewActions } from "../../../features/mockups/mockupsSlice";
import { AppDispatch } from "../../../Redux/store";
import { selectElement } from "../../../zustand/CanvasStore/store";
import { addImage } from "../../../zustand/MockupsStore/store";

export const canvasFilters = (filters: Filter[]) => {
  const filtersString = filters.map((filter) => {
    return `${filter.property}(${filter.value}${filter.unit})`;
  });
  return filtersString.join(" ");
};

export function downloadURI(uri: string) {
  var link = document.createElement("a");
  link.download = "";
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export const handleExport = (
  SELECT_ELEMENT: selectElement,
  stageRefs: React.RefObject<KonvaNodeComponent<Stage, StageProps>>[],
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
    // return downloadURI(uri);
  }
};

export const handlePreview = async (
  router: NextRouter,
  SELECT_ELEMENT: selectElement,
  ADD_IMAGE: addImage,
  stageRefs: React.RefObject<KonvaNodeComponent<Stage, StageProps>>[],
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

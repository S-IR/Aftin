import React, { useRef, useState } from "react";
import { KonvaNodeComponent, StageProps } from "react-konva";
import { Stage } from "konva/lib/Stage";
import { InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { NoteAdd, Wallpaper } from "@mui/icons-material";
import { useSpring, animated, useTransition } from "react-spring";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
} from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";
import {
  useCanvasState,
  useTemporalCanvasState,
} from "../../../zustand/CanvasStore/store";
import {
  handleExport,
  handlePreview,
} from "../../../model/client-side/image-editor/Canvas";
import { useMockupsStore } from "../../../zustand/MockupsStore/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import { useQuery } from "react-query";
import { fetchUserStatus } from "../../../model/client-side/general/fetches";
import { Base64Data, paidFeature } from "../../../typings/typings";
import PaidFeatureDialog from "../../general/dialog-boxes/PaidFeatureDialog";
import SVGConverterDialog from "../../general/dialog-boxes/SVGConverterDialog";
import { User } from "firebase/auth";
import LoginFirstDialog from "../../general/dialog-boxes/LoginFirstDialog";

interface props {
  stageRefs: LegacyRef<Stage>[];
  downloadRef: React.RefObject<HTMLButtonElement>;
}
export type canvasEditButtonDialog = "svg-convert" | "paid" | "login";

/**
 * This component appears on the right side of the canvas and allows users to do actions that do not fit in a particular section or are meant to be at quick disposal
 * @param param0
 * @returns
 */
const CanvasEditButtons = ({ stageRefs, downloadRef }: props) => {
  const { undo, redo, futureStates, pastStates } = useTemporalCanvasState(
    (state) => state
  );

  //variables used for when the user clicks on a paid feature like svg conversions
  const [dialog, setDialog] = useState<null | canvasEditButtonDialog>(null);
  const [featureName, setFeatureName] = useState<paidFeature>("svg-convert");
  const [user, userLoading] = useAuthState(auth);
  const { data: loginStatus, isLoading: loginStatusLoading } = useQuery(
    ["getUserStatus", user?.uid, userLoading],
    () => fetchUserStatus(user),
    {
      //1hr
      staleTime: 1000 * 60 * 60,
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  );
  //saves the selected page image in order to he sent to a image editing feature
  const [beforeImage, setBeforeImage] = useState<null | {
    src: Base64Data<"png">;
    width: number;
    height: number;
  }>(null);

  const router = useRouter();
  const [
    canvasPages,
    pageId,
    elementId,
    ADD_PAGE,
    SELECT_PAGE,
    SELECT_ELEMENT,
  ] = useCanvasState(
    (state) =>
      [
        state.pages,
        state.selected.page,
        state.selected.element,
        state.ADD_PAGE,
        state.SELECT_PAGE,
        state.SELECT_ELEMENT,
      ] as const
  );
  //used for the preview button
  const ADD_IMAGE = useMockupsStore((state) => state.ADD_IMAGE);

  //tracks the amount of pages on the canvas
  const pagesLength = canvasPages.length;
  const optionValues: number[] = [];
  for (let i = 0; i < pagesLength; i++) {
    optionValues.push(i);
  }

  const [showLeftSidebar, toggleLeftSidebar] = useState(true);

  return showLeftSidebar ? (
    <section
      className={` fixed top-[75px] right-0 z-50 flex h-[90vh]  w-[10vw]  flex-col rounded-sm border-l-2 border-dashed  border-yellow-600 bg-yellow-900 bg-gradient-to-br p-2 ${
        showLeftSidebar ? `right-0` : `-right-36  cursor-none opacity-0`
      } transition-all duration-300 `}
    >
      <button
        className=" absolute top-3 -left-5 z-10 w-auto rounded-full  p-2 transition-all duration-300 ease-in-out  "
        onClick={() => toggleLeftSidebar((v) => !v)}
      >
        <FaAngleDoubleRight direction={"right"} className={"h-6 w-6"} />
      </button>
      {pageId !== null && pageId !== undefined && (
        <div className="mt-6 mb-8 flex flex-col items-center justify-center border-b-2 border-brown-700 pb-2 align-middle ">
          <InputLabel
            className="my-2 mx-2  font-Handwriting text-lg font-semibold !text-brown-300  "
            id="pageId-select"
          >{`Selected Page `}</InputLabel>
          <Select
            labelId="pageId-select"
            id="demo-simple-select"
            defaultValue={1}
            label="Age"
            value={pageId}
            className={` !rounded-full !text-brown-300`}
            onChange={(e) => SELECT_PAGE(Number(e.target.value))}
          >
            {optionValues.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value + 1}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
      <div className="flex grow flex-col space-y-6  p-5 align-middle">
        {/* <button
          className="flex h-[8vh] w-auto items-center justify-center rounded-sm border-t-4  border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm  shadow-brown-500 drop-shadow-md  transition-all duration-300 ease-in-out   hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          onClick={() => ADD_PAGE()}
        >
          Add Page
        </button> */}

        <button
          className=" h-[8vh] w-auto rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out   hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          ref={downloadRef}
          onClick={() => handleExport(SELECT_ELEMENT, stageRefs, "all")}
        >
          Download
        </button>
        <button
          className=" h-[8vh] w-auto rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out   hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          disabled={pastStates.length === 0}
          onClick={() => undo()}
        >
          Undo
        </button>
        <button
          className=" h-[8vh] w-auto rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out   hover:bg-brown-500 active:shadow-none disabled:bg-brown-200/80"
          disabled={futureStates.length === 0}
          onClick={() => redo()}
        >
          Redo
        </button>

        <button
          className=" h-[8vh] w-auto rounded-sm border-t-4 border-orange-700 bg-brown-800 p-2  font-['Lato'] text-sm shadow-brown-500  drop-shadow-md transition-all  duration-300 ease-in-out   hover:bg-brown-500 active:shadow-none  disabled:bg-brown-200/80"
          onClick={() =>
            handlePreview(router, SELECT_ELEMENT, ADD_IMAGE, stageRefs, "all")
          }
        >
          Preview
        </button>
        <button
          disabled={loginStatusLoading}
          className="!mt-auto h-auto w-full whitespace-nowrap rounded bg-orange-800 p-2 text-center  font-['Lato'] text-xs text-orange-100  drop-shadow-md transition-all  duration-300 ease-in-out   hover:bg-orange-700 active:shadow-none  disabled:bg-brown-200/80  "
          onClick={async () => {
            // I need to use this silly structure to ensure that the elements are first deselected so that they don't have that transformer wrapper around them before the image is going to be transferred to the SVG box
            new Promise((resolve) => {
              resolve(SELECT_ELEMENT(pageId, null));
            }).then(async () => {
              const stageRef = stageRefs[pageId as number];
              setBeforeImage({
                src: stageRef.current.toDataURL() as Base64Data<"png">,
                width: stageRef.current.width() as number,
                height: stageRef.current.height() as number,
              });
              setFeatureName("svg-convert");
              setDialog("svg-convert");
            });
          }}
        >
          Export as SVG <br></br>
          <Wallpaper htmlColor="#D5EDFF" className="h-8 w-8" />
        </button>
      </div>
      <PaidFeatureDialog
        dialog={dialog}
        setDialog={setDialog}
        feature={featureName}
      />
      <SVGConverterDialog
        dialog={dialog}
        setDialog={setDialog}
        beforeImageSrc={beforeImage?.src}
        width={beforeImage?.width}
        height={beforeImage?.height}
        user={user as User}
        loginStatus={loginStatus}
      />
      {/* ignore ts  */}
      <LoginFirstDialog dialogName={dialog} setDialog={setDialog} />
    </section>
  ) : (
    <Tooltip title="Toggle sidebar">
      <button
        className={` absolute top-[75px] right-0 z-10 w-auto rounded-full  p-2 transition-all duration-300 ease-in-out`}
        onClick={() => toggleLeftSidebar((v) => !v)}
      >
        <FaAngleDoubleLeft className="h-16 w-16 md:h-8 md:w-8 " />
      </button>
    </Tooltip>
  );
};

export default CanvasEditButtons;

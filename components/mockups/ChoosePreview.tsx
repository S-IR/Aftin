import { InputLabel, Popover, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import {
  MockupType,
  previewCategoryNames,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/mockups/previewCategories";
import { previewSelectedCategory } from "../../pages/restaurant-mockups";
import { useMockupsStore } from "../../zustand/MockupsStore/store";
import DigitalOptions from "./DigitalOptions";
import PhysicalOptions from "./PhysicalOptions";

interface props {
  mockupType: null | MockupType;
}

const ChoosePreview = ({ mockupType }: props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [digitalMockupHovered, setDigitalMockupHovered] = useState(false);
  const [physicalMockupHovered, setPhysicalMockupHovered] = useState(false);

  const [images, currentlyPreviewed, SELECT_IMAGE] = useMockupsStore(
    (state) => [state.images, state.currentlyPreviewed, state.SELECT_IMAGE]
  );

  const optionValues: number[] = [];
  for (let i = 0; i < images.length; i++) {
    optionValues.push(i);
  }

  return (
    <section className="relative mb-2 flex h-[85vh] w-56 flex-col bg-yellow-800  ">
      {/* PUT A LOGO UP THERE */}
      <div className="flex h-auto w-full flex-col items-center justify-center bg-yellow-600 align-middle">
        <h3 className="my-10 text-center font-Handwriting text-2xl text-yellow-200">
          Mock-up Type
        </h3>
        <div className=" group relative flex h-28 w-full items-center justify-center align-middle">
          <button
            className="buttons-3 z-10"
            id={"digital-button"}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            Digital Mockups
          </button>
          <Image
            src={"/mockups/DigitalMockup.png"}
            alt={"background banner image for digital mock-ups"}
            fill
            style={{ objectFit: "cover" }}
            className={
              "absolute top-0 left-0 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
            }
          />
        </div>
        <div className=" group relative flex h-28 w-full items-center justify-center align-middle">
          <button
            className="buttons-3 z-10"
            id={"physical-button"}
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            Physical Mockups
          </button>
          <Image
            src={"/mockups/PhysicalMockup.png"}
            alt={"background banner image for physical mock-ups"}
            layout={"fill"}
            style={{ objectFit: "cover" }}
            className={
              "absolute top-0 left-0 brightness-50 filter transition-all duration-300 group-hover:brightness-75"
            }
          />
        </div>
      </div>
      {images.length !== 0 && currentlyPreviewed !== null && (
        <div className="mt-auto h-32 w-full bg-yellow-600">
          <div className="mt-6 mb-8 flex flex-col items-center justify-center pb-2 align-middle ">
            <InputLabel
              className="my-2 mx-2  font-Handwriting text-xl font-semibold text-yellow-300  "
              id="pageId-select"
            >{`Selected Page `}</InputLabel>
            <Select
              labelId="pageId-select"
              id="demo-simple-select"
              defaultValue={1}
              label="Age"
              value={currentlyPreviewed}
              className={`rounded-full text-white`}
              onChange={(e) => SELECT_IMAGE(Number(e.target.value))}
            >
              {optionValues.map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value + 1}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      )}
      <PhysicalOptions
        anchorEl={anchorEl}
        open={anchorEl?.id === "physical-button"}
        setAnchorEl={setAnchorEl}
        mockupType={mockupType}
      />
      <DigitalOptions
        anchorEl={anchorEl}
        open={anchorEl?.id === "digital-button"}
        setAnchorEl={setAnchorEl}
        mockupType={mockupType}
      />
    </section>
  );
};

export default ChoosePreview;

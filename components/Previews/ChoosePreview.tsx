import { InputLabel, Popover, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  previewCategoryNames,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/previews/previewCategories";
import { previewSelectedCategory } from "../../pages/previews";
import { usePreviewsStore } from "../../zustand/PreviewsStore/store";
import DigitalOptions from "./DigitalOptions";
import PhysicalOptions from "./PhysicalOptions";

interface props {
  selectedCategory: previewSelectedCategory;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<previewSelectedCategory>
  >;
}

const ChoosePreview = ({ selectedCategory, setSelectedCategory }: props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [digitalMockupHovered, setDigitalMockupHovered] = useState(false);
  const [physicalMockupHovered, setPhysicalMockupHovered] = useState(false);

  useEffect(() => {
    console.log(`anchorEl`, anchorEl);
  }, [anchorEl]);
  const [images, currentlyPreviewed, SELECT_IMAGE] = usePreviewsStore(
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
            src={"/frontend-used-images/previews/DigitalMockup.png"}
            alt={"background banner image for digital mock-ups"}
            layout={"fill"}
            objectFit={"cover"}
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
            src={"/frontend-used-images/previews/PhysicalMockup.png"}
            alt={"background banner image for physical mock-ups"}
            layout={"fill"}
            objectFit={"cover"}
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
      {/* <div className="absolute top-0 left-0 h-full w-48">
        <Image
          src={"/frontend-used-images/previews/ChooseMockup.png"}
          alt={"banner for mockup choices"}
          layout={"fill"}
        />
      </div>

      <div className="absolute top-0 left-0">
        <div
          className={`relative  h-0 w-0  border-t-[90vh] border-r-[192px]   border-l-transparent border-r-transparent   font-Handwriting   font-bold  transition-all duration-300 peer-hover:border-r-[200px] ${
            digitalMockupHovered ? `border-red-500/25` : `border-red-500/10`
          }`}
        />
        <button
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
          id={"digital-button"}
          onMouseEnter={() => setDigitalMockupHovered(true)}
          onMouseLeave={() => setDigitalMockupHovered(false)}
          className="peer absolute top-1/4  left-2 z-20 font-Handwriting text-2xl font-bold text-orange-300  transition-all duration-300 "
        >
          Digital <br></br> Mock-ups
        </button>
      </div>
      <div className="absolute top-0 left-0 w-48">
        <div
          className={`relative  h-0 w-0  border-b-[90vh] border-l-[192px]  border-black border-l-transparent border-r-transparent   font-Handwriting   transition-all  duration-300 peer-hover:border-r-[200px] ${
            physicalMockupHovered ? `border-red-500/25` : `border-red-500/10`
          } `}
        />
        <button
          id={"physical-button"}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          onMouseEnter={() => setPhysicalMockupHovered(true)}
          onMouseLeave={() => setPhysicalMockupHovered(false)}
          className="peer absolute bottom-1/4 right-2 z-20  rounded-md  font-Handwriting  text-2xl font-bold text-orange-300 transition-all duration-300"
        >
          Physical <br></br> Mock-ups
        </button>
      </div>

      <PhysicalOptions
        open={anchorEl?.id === "physical-button"}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DigitalOptions
        open={anchorEl?.id === "digital-button"}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      /> */}
    </section>
  );
};

export default ChoosePreview;

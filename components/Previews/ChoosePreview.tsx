import { Popover } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  previewCategoryNames,
  previewCategoryType,
  previewCategoryValues,
} from "../../constants/previews/previewCategories";
import { previewSelectedCategory } from "../../pages/previews";
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

  return (
    <section className="relative mb-2 flex h-[90vh] w-48 flex-col  ">
      {/* PUT A LOGO UP THERE */}
      <div className="absolute top-0 left-0 h-full w-48">
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
      />
    </section>
  );
};

export default ChoosePreview;

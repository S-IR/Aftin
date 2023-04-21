export interface tierBenefit {
  name: string;
  value: "bronze" | "silver" | "gold";
  monthPrice: "Free" | number;
  yearPrice: "Free" | number;
  yearlyPerMonthPrice: "Free" | number;
  imgSrc: string;
  benefits: string[];
}

export const tierBenefits: tierBenefit[] = [
  {
    name: `Bronze Aftin`,
    value: "bronze",
    monthPrice: "Free",
    yearPrice: "Free",
    imgSrc: "/frontend-used-images/homepage/bronze",
    yearlyPerMonthPrice: "Free",
    benefits: [
      "Thousands of free stock images",
      "Thousands of free graphic designs",
      "Access to our image editor",
      "Access to image previewing",
    ],
  },
  {
    name: `Silver Aftin`,
    value: "silver",
    monthPrice: 29.95,
    yearPrice: 287.95,
    imgSrc: "/frontend-used-images/homepage/silver",
    yearlyPerMonthPrice: 23.95,
    benefits: [
      "Everything that Bronze tier offers",
      "Access to higher quality stock images and graphic designs",
      "Access to higher quality decorative elements (frames, icons etc.)",
    ],
  },
  {
    name: `Golden Aftin`,
    value: "gold",
    monthPrice: 59.95,
    yearPrice: 575.95,
    yearlyPerMonthPrice: 47.95,
    imgSrc: "/frontend-used-images/homepage/gold",
    benefits: [
      "Everything that Silver tier offers",
      "Access to best stock images and graphic designs",
      "Access to AI image scaler and image debluring",
    ],
  },
];

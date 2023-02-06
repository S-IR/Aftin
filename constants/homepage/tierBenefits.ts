interface tierBenefit {
  name: string;
  monthPrice: "Free" | number;
  yearPrice: "Free" | number;
  yearlyPerMonthPrice: "Free" | number;
  imgSrc: string;
  benefits: string[];
}

export const tierBenefits: tierBenefit[] = [
  {
    name: `Bronze Aftin`,
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
    monthPrice: 19.95,
    yearPrice: 189.95,
    imgSrc: "/frontend-used-images/homepage/silver",
    yearlyPerMonthPrice: 15.83,
    benefits: [
      "Everything that Bronze tier offers",
      "Access to higher quality stock images and graphic designs",
      "Access to higher quality decorative elements (frames, icons etc.)",
    ],
  },
  {
    name: `Golden Aftin`,
    monthPrice: 44.95,
    yearPrice: 429.95,
    yearlyPerMonthPrice: 38.83,
    imgSrc: "/frontend-used-images/homepage/gold",
    benefits: [
      "Everything that Silver tier offers",
      "Access to best stock images and graphic designs",
      "Access to AI image scaler and image debluring",
    ],
  },
];

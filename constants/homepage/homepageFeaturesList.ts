interface homepageFeature {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
}

export const homepageFeaturesList: homepageFeature[] = [
  {
    title: `Find fitting Stock Images`,
    description: ` Access our full library of stock photos to display high resolution images that fit your needs.`,
    href: `/`,
    imgSrc: ``,
  },
  {
    title: `Browse unique Graphic Designs`,
    description: `  Catch the eyes of your customers with our 
    artistically made banners, menus, brochures and more.`,
    href: `/graphic-designs`,
    imgSrc: ``,
  },
  {
    title: `Enhance your images`,
    description: `enhance images effortlessly.
    Crop, edit, deblur or increase your image resolution effortlessly through our image editor or AI tools to increase image resolution or deblur images`,
    href: `/image-editor`,
    imgSrc: ``,
  },
  {
    title: `Preview your images`,
    description: `Preview your images in your desired environment using our Smartmockup system to ensure that you are getting what you need`,
    href: "/previews",
    imgSrc: ``,
  },
];

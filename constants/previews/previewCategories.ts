export const previewCategoryType = [
  `Phone`,
  `Website`,
  `Facebook Banner`,
  `Twitter Banner`,
  `Facebook Post`,
  `Instagram Post`,
  `day-hand`,
  ` day-table`,
  `day-wall`,
  `day-entrance`,
  `day-outside`,
  `night-hand`,
  `night-table`,
  `night-wall`,
  `night-entrance`,
  `night-outside`,
] as const;
export const digitalCategories = [
  {
    name: `Phone`,
    value: `phone`,
    source: "/frontend-used-images/previews/phone.png",
  },
  {
    name: `Website`,
    value: `website`,
    source: "/frontend-used-images/previews/website.png",
  },
  {
    name: `Facebook Banner`,
    value: `facebook-banner`,
    source: "/frontend-used-images/previews/facebook-banner.png",
  },
  {
    name: `Twitter Banner`,
    value: `twitter-banner`,
    source: "/frontend-used-images/previews/twitter-banner.png",
  },
  {
    name: `Facebook Post`,
    value: `facebook-post`,
    source: "/frontend-used-images/previews/facebook-post.png",
  },
  {
    name: `Instagram Post`,
    value: `instagram-post`,
    source: "/frontend-used-images/previews/instagram-post.png",
  },
] as const;
export const dayCategories = [
  {
    name: `In Hand`,
    value: `day-hand`,
    source: "/frontend-used-images/previews/day-hand.png",
  },
  {
    name: `On Table`,
    value: `day-table`,
    source: "/frontend-used-images/previews/day-table.png",
  },
  {
    name: `On wall`,
    value: `day-wall`,
    source: "/frontend-used-images/previews/day-wall.png",
  },
  {
    name: `At Entrance`,
    value: `day-entrance`,
    source: "/frontend-used-images/previews/day-entrance.png",
  },
  {
    name: `Outside`,
    value: `day-outside`,
    source: "/frontend-used-images/previews/day-outside.png",
  },
] as const;
export const nightCategories = [
  {
    name: `In Hand`,
    value: `night-hand`,
    source: `/frontend-used-images/previews/night-hand.png`,
  },
  {
    name: `On Table`,
    value: `night-table`,
    source: `/frontend-used-images/previews/night-table.png`,
  },
  {
    name: `On wall`,
    value: `night-wall`,
    source: `/frontend-used-images/previews/night-wall.png`,
  },
  {
    name: `At Entrance`,
    value: `night-entrance`,
    source: `/frontend-used-images/previews/night-entrance.png`,
  },
  {
    name: `Outside`,
    value: `night-outside`,
    source: `/frontend-used-images/previews/night-outside.png`,
  },
] as const;

export type previewCategoryValues =
  | "phone"
  | "website"
  | "facebook-banner"
  | "twitter-banner"
  | "facebook-post"
  | "instagram-post"
  | "day-hand"
  | "day-table"
  | "day-wall"
  | "day-entrance"
  | "day-outside"
  | "night-hand"
  | "night-table"
  | "night-wall"
  | "night-entrance"
  | "night-outside";
export type previewCategoryNames =
  | `Phone`
  | `Website`
  | `Facebook Banner`
  | `Twitter Banner`
  | `Facebook Post`
  | `Instagram Post`
  | `In hand`
  | ` On table`
  | `On wall`
  | `At entrance`
  | `Outside`;

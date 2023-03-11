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
type MockupCategory = { name: MockupName; value: MockupType; source: string };
export const digitalCategories: MockupCategory[] = [
  {
    name: `Phone`,
    value: `phone`,
    source: "/frontend-used-images/mockups/phone.png",
  },
  {
    name: `Website`,
    value: `website`,
    source: "/frontend-used-images/mockups/website.png",
  },
  {
    name: `Facebook Banner`,
    value: `facebook-banner`,
    source: "/frontend-used-images/mockups/facebook-banner.png",
  },
  {
    name: `Twitter Banner`,
    value: `twitter-banner`,
    source: "/frontend-used-images/mockups/twitter-banner.png",
  },
  {
    name: `Facebook Post`,
    value: `facebook-post`,
    source: "/frontend-used-images/mockups/facebook-post.png",
  },
  {
    name: `Instagram Post`,
    value: `instagram-post`,
    source: "/frontend-used-images/mockups/instagram-post.png",
  },
];
export const dayCategories: MockupCategory[] = [
  {
    name: `In Hand`,
    value: `in-hand-day-environment`,
    source: "/frontend-used-images/mockups/day-hand.png",
  },
  {
    name: `On Table`,
    value: `on-table-day-environment`,
    source: "/frontend-used-images/mockups/day-table.png",
  },
  {
    name: `On wall`,
    value: `on-wall-day-environment`,
    source: "/frontend-used-images/mockups/day-wall.png",
  },
  {
    name: `At Entrance`,
    value: `at-entrance-day-environment`,
    source: "/frontend-used-images/mockups/day-entrance.png",
  },
];
export const nightCategories: MockupCategory[] = [
  {
    name: `In Hand`,
    value: `in-hand-night-environment`,
    source: `/frontend-used-images/mockups/night-hand.png`,
  },
  {
    name: `On Table`,
    value: `on-table-night-environment`,
    source: `/frontend-used-images/mockups/night-table.png`,
  },
  {
    name: `On wall`,
    value: `on-wall-night-environment`,
    source: `/frontend-used-images/mockups/night-wall.png`,
  },
  {
    name: `At Entrance`,
    value: `at-entrance-night-environment`,
    source: `/frontend-used-images/mockups/night-entrance.png`,
  },
];
export const MockupTypeArr = [
  "phone",
  "website",
  "in-hand-day-environment",
  "on-table-day-environment",
  "on-wall-day-environment",
  "at-entrance-day-environment",
  "in-hand-night-environment",
  "on-table-night-environment",
  "on-wall-night-environment",
  "at-entrance-night-environment",
] as const;
export type MockupType = (typeof MockupTypeArr)[number];

export type MockupName =
  | `Phone`
  | `Website`
  | `In Hand`
  | `On Table`
  | `On wall`
  | `At Entrance`
  | `Outside`;
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
    source: "/mockups/phone.png",
  },
  {
    name: `Website`,
    value: `website`,
    source: "/mockups/website.png",
  },
];
export const dayCategories: MockupCategory[] = [
  {
    name: `In Hand`,
    value: `in-hand-day-environment`,
    source: "/mockups/day-hand.png",
  },
  {
    name: `On Table`,
    value: `on-table-day-environment`,
    source: "/mockups/day-table.png",
  },
  {
    name: `On wall`,
    value: `on-wall-day-environment`,
    source: "/mockups/day-wall.png",
  },
  {
    name: `At Entrance`,
    value: `at-entrance-day-environment`,
    source: "/mockups/day-entrance.png",
  },
];
export const nightCategories: MockupCategory[] = [
  {
    name: `In Hand`,
    value: `in-hand-night-environment`,
    source: `/mockups/night-hand.png`,
  },
  {
    name: `On Table`,
    value: `on-table-night-environment`,
    source: `/mockups/night-table.png`,
  },
  {
    name: `On wall`,
    value: `on-wall-night-environment`,
    source: `/mockups/night-wall.png`,
  },
  {
    name: `At Entrance`,
    value: `at-entrance-night-environment`,
    source: `/mockups/night-entrance.png`,
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

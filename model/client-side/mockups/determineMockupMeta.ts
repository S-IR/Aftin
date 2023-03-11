import { MockupType } from "../../../constants/mockups/previewCategories";

export const determineMockupMeta = (
  mockupType: MockupType
): { title: string; description: string; canonical: string } => {
  let mockupName = determineMockupName(mockupType);
  const siteUrl = process.env.NEXT_PUBLIC_server;

  switch (mockupType) {
    case "phone":
      return {
        title: "Restaurant Image Mockups for Phone Screens",
        description:
          "Preview how your images will look on phone screens on popular restaurant review websites ",
        canonical: "/restaurant-mockups/phone",
      };
    default:
      return {
        title: `Restaurant ${mockupName} Mockup Previewer`,
        description: `Preview restaurant images on ${mockupName} mockups`,
        canonical: `${siteUrl}/restaurant-mockups/${mockupType}`,
      };
  }
};
const determineMockupName = (
  mockupType: MockupType
):
  | "Website"
  | "Facebook Banner"
  | "Twitter Banner"
  | "Facebook Post"
  | "Instagram Post"
  | "Hand Holding"
  | "Table"
  | "Wall"
  | "Entrance" => {
  switch (mockupType) {
    case "website":
      return "Website";
    case "facebook-banner":
      return "Facebook Banner";
    case "twitter-banner":
      return "Twitter Banner";
    case "facebook-post":
      return "Facebook Post";
    case "instagram-post":
      return "Instagram Post";
    case "at-entrance-day-environment":
    case "at-entrance-night-environment":
      return "Entrance";
    case "on-table-day-environment":
    case "on-table-night-environment":
      return "Table";
    case "at-entrance-day-environment":
    case "at-entrance-night-environment":
      return "Entrance";
    case "on-wall-night-environment":
    case "on-wall-day-environment":
      return "Wall";
    case "on-table-night-environment":
    case "on-table-day-environment":
      return "Table";
    default:
      return "Facebook Banner";
  }
};

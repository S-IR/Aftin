import {
  mockupTemplate,
  previewPhone,
} from "../../../constants/mockups/mockupTemplates";
import { MockupType } from "../../../constants/mockups/previewCategories";

export const determineMockupImg = (
  mockupType: MockupType
): mockupTemplate | null => {
  switch (mockupType) {
    case "phone":
      return previewPhone;
    default:
      return null;
  }
};

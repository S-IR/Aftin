import {
  changeModalText,
  changeModalType,
} from "../../../zustand/ModalBoxStore/store";

export const triggerMissingMockupFeature = (
  userId: string,
  changeModalText: changeModalText,
  changeModalType: changeModalType
) => {
  window.gtag("event", "request_mockup_feature", {
    userId,
  });
  changeModalText({
    title: undefined,
    text: "Previewing images on mockups is not yet available. We are sorry for the inconvenience",
  });
  return changeModalType("missing-feature");
};

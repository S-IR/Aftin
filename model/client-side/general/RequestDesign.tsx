import { User } from "firebase/auth";
import { GraphicDesignType } from "../../../typings/image-types/ImageTypes";

export const requestCustomDesign = (
  requestedDesign: "not-known" | GraphicDesignType,
  setModalText: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
  user: User | null | undefined
) => {
  window.gtag(`event`, `request_custom_design_clicked`, {
    userId: user ? user.uid : "not logged in",
    requestedDesign,
  });
  setModalText(
    <p>
      We are not currently available to allow the requesting of custom graphic
      designs.<br></br>
      We are sorry for the inconvenience
    </p>
  );
};

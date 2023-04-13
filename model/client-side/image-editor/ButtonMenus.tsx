import {
  DrawButtons,
  ImagesButtons,
  ShowLess,
  ShowMore,
  TextButtons,
  SidebarIcon,
  StylizeButtons,
} from "../../../components/image-editor/Sidebar";
import LayoutButtons from "../../../components/image-editor/Sidebar/LayoutButtons";
import { activeSidebarType } from "../../../components/image-editor/Sidebar/SidebarIcon";

export const ButtonMenuSwitch = (
  activeSidebar: activeSidebarType,
  setActiveSidebar: React.Dispatch<React.SetStateAction<activeSidebarType>>
): JSX.Element => {
  switch (activeSidebar) {
    case "Layout":
      return <LayoutButtons />;
    case "Images":
      return <ImagesButtons setActiveSidebar={setActiveSidebar} />;
    case "Text":
      return <TextButtons setActiveSidebar={setActiveSidebar} />;
    case "Stylize":
      return <StylizeButtons />;
    case "Draw":
      return <DrawButtons setActiveSidebar={setActiveSidebar} />;
    default:
      return <ImagesButtons setActiveSidebar={setActiveSidebar} />;
  }
};

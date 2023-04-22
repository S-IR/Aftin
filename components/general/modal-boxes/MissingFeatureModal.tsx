import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";
import Fade from "../../../constants/general/Fade";
import { generalModalBoxProps } from "./AllDialogBoxes";

interface props {
  text: JSX.Element | null;
  setModalText: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}

const MissingFeatureModal = ({
  title = "Feature not yet available",
  text = "This feature is not yet available. We are sorry for the inconvenience",
  modalType,
  changeModalType,
}: generalModalBoxProps) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 400,
    bgcolor: "#000000",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };
  return (
    <Modal
      open={modalType === "missing-feature"}
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      onClose={() => changeModalType(null)}
    >
      <Fade in={text !== null}>
        <Box
          sx={style}
          className={
            "flex flex-col items-center justify-center rounded-sm text-center align-top "
          }
        >
          <Typography
            id="spring-modal-title"
            variant="h6"
            component="h2"
            className="text-4xl text-orange-300"
          >
            {title}
          </Typography>
          {typeof text === "string" ? (
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              {text}
            </Typography>
          ) : (
            { text }
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default MissingFeatureModal;
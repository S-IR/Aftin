import { Box } from "@mui/system";
import React from "react";
import { galleryImageDialog } from "../SiteGallery";
import { generalModalBoxProps } from "./AllDialogBoxes";

import { Modal, Typography } from "@mui/material";

const ServerErrorModal = ({
  title = "Internal server error",
  text = " An internal server error has occurred. Please try again later.",
  changeModalType,
  modalType,
  changeModalText,
}: generalModalBoxProps) => {
  return (
    <Modal
      open={modalType === "server-error"}
      keepMounted
      onClose={() => changeModalType(null)}
      aria-describedby="alert-dialog-slide-description"
      className="bg-gray-500/40"
    >
      <Box className="bg-red-200">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {text}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ServerErrorModal;

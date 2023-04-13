import { Box } from "@mui/system";
import React from "react";
import { generalModalBoxProps } from "./AllDialogBoxes";
import { Modal, Typography } from "@mui/material";

const GenericSuccessModal = ({
  title = "Changes made successfully",
  text = "Your changes have been made successfully",
  modalType,
  changeModalType,
  changeModalText,
}: generalModalBoxProps) => {
  return (
    <Modal
      open={modalType === "generic-success"}
      keepMounted
      onClose={() => changeModalType(null)}
      aria-describedby="alert-dialog-slide-description"
      className="bg-gray-500/40"
    >
      <Box className="bg-blue-400">
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

export default GenericSuccessModal;

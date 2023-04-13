import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { generalModalBoxProps } from "./AllDialogBoxes";
import { Modal, Typography } from "@mui/material";

const GenericErrorModal = ({
  title = "An error has occurred",
  text = "Please try again later. If the error persists then please contact us through a support ticket",
  modalType,
  changeModalType,
  changeModalText,
}: generalModalBoxProps) => {
  return (
    <Modal
      open={modalType === "generic-error"}
      keepMounted
      onClose={() => changeModalType(null)}
      aria-describedby="alert-dialog-slide-description"
      className="bg-gray-500/40"
    >
      <Box className="bg-red-400">
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

export default GenericErrorModal;

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { generalModalBoxProps } from "./AllDialogBoxes";
import { Modal, Typography } from "@mui/material";

const AuthErrorModal = ({
  title = "Authentication Error",
  text = "There was an error trying to authenticate your your given information. Make sure your email and password is correct try again later ",
  modalType,
  changeModalType,
}: generalModalBoxProps) => {
  return (
    <Modal
      open={modalType === "auth-error"}
      keepMounted
      onClose={() => changeModalType(null)}
      aria-describedby="alert-modal-slide-description"
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

export default AuthErrorModal;

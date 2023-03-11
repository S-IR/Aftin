import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { galleryImageDialog } from "../SiteGallery";

interface props {
  dialog: boolean | string | null | galleryImageDialog["name"];
  setDialog: React.Dispatch<
    React.SetStateAction<boolean | null | galleryImageDialog>
  >;
}

const ServerErrorDialog = ({ dialog, setDialog }: props) => {
  return (
    <Dialog
      open={
        typeof dialog === "boolean" ? dialog : dialog === "internalServerError"
      }
      keepMounted
      onClose={() =>
        setDialog(() => (typeof dialog === "boolean" ? false : null))
      }
      aria-describedby="alert-dialog-slide-description"
      className="bg-gray-500/40"
    >
      <Box className="bg-red-200">
        <DialogTitle className="my-4  border-b-2 border-black text-center font-serif !text-6xl text-black">
          Internal server error
        </DialogTitle>
        <DialogContent className="my-4 text-black ">
          <DialogContentText id="alert-dialog-slide-description">
            An internal server error has occurred. Please try again later.
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Box>
    </Dialog>
  );
};

export default ServerErrorDialog;

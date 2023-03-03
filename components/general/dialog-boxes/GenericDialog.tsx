import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface props {
  dialog: boolean | string | null;
  setDialog: React.Dispatch<React.SetStateAction<boolean | string | null>>;
  title: string | JSX.Element;
  contextText?: string | JSX.Element;
}

const GenericDialog = ({ dialog, setDialog, title, contextText }: props) => {
  return (
    <Dialog
      open={typeof dialog === "boolean" ? dialog : dialog === "genericDialog"}
      keepMounted
      onClose={() =>
        setDialog(() => (typeof dialog === "boolean" ? false : null))
      }
      aria-describedby="alert-dialog-slide-description"
      className="bg-gray-500/40"
    >
      <Box className="bg-red-200">
        <DialogTitle className="my-4  border-b-2 border-black text-center font-serif !text-6xl text-black">
          {title}
        </DialogTitle>
        <DialogContent className="my-4 text-black ">
          <DialogContentText id="alert-dialog-slide-description">
            {contextText}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Box>
    </Dialog>
  );
};

export default GenericDialog;

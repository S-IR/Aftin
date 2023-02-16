import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface props {
  dialogError: {
    title: string | JSX.Element;
    content: string | JSX.Element;
  } | null;
  setDialogError: React.Dispatch<
    React.SetStateAction<{
      title: string | JSX.Element;
      content: string | JSX.Element;
    } | null>
  >;
}

const AuthErrorDialogue = ({ dialogError, setDialogError }: props) => {
  return (
    <Dialog
      open={dialogError !== null}
      keepMounted
      onClose={() => setDialogError(null)}
      aria-describedby="alert-dialog-slide-description"
      className="bg-gray-500/40"
    >
      <Box className="bg-red-200">
        <DialogTitle className="my-4  border-b-2 border-black text-center font-serif !text-6xl text-black">
          {dialogError?.title}
        </DialogTitle>
        <DialogContent className="my-4 text-black ">
          <DialogContentText id="alert-dialog-slide-description">
            {dialogError?.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Box>
    </Dialog>
  );
};

export default AuthErrorDialogue;

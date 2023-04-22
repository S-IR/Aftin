import { FirebaseError } from "firebase-admin";
import {
  changeModalText,
  changeModalType,
} from "../../../zustand/ModalBoxStore/store";

/**
 * Function that changes a login error to a more user friendly text in a modal that appears
 * @param error the login error
 * @param changeModalText fn that lets you modify the text on the modal
 * @param changeModalType fn that lets you make the error modal appear
 * @returns Changes the modal to either 'server-error' or 'auth-error'
 */
export const determineModalError = (
  error: FirebaseError | unknown,
  changeModalText: changeModalText,
  changeModalType: changeModalType
) => {
  if (error === undefined || error.code === undefined) {
    return changeModalType("server-error");
  }

  switch (error.code) {
    // SIGNUP ERRORS
    case "auth/email-already-in-use":
      changeModalText({
        title: "Email already in use",
        text: "The provided email is already in use by another user. Please use another email address",
      });
      break;

    case "auth/email-already-exists":
      changeModalText({
        title: "Email already in use",
        text: "The provided email is already in use by another user. Please use another email address",
      });
      break;
    case "auth/invalid-display-name":
      changeModalText({
        title: "Invalid Username",
        text: "Your provided username is invalid",
      });
      break;
    case "auth/invalid-email":
      changeModalText({
        title: "Invalid Email",
        text: "Your provided email is invalid",
      });
      break;
    case "auth/invalid-password":
      changeModalText({
        title: "Invalid Password",
        text: "Your provided password is invalid",
      });
      break;
    case "auth/uid-already-exists":
      changeModalText({
        title: "Email already in use",
        text: "The provided email is already in use by another user. Please use another email address",
      });
      break;

    //LOGIN ERRORS
    case "auth/user-not-found" || "wrong-email":
      changeModalText({
        title: "No user found",
        text: "No user with that email address has been found",
      });
      break;

    case "auth/wrong-password" || "wrong-email":
      changeModalText({
        title: "Wrong Email or Password",
        text: "Your provided email or password is wrong",
      });
      break;

    default:
      changeModalText({
        title: "Internal Server Error",
        text: "An unexpected internal server has occurred. Please try again later",
      });
  }
  return changeModalType("auth-error");
};

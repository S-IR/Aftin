import { FirebaseError } from "firebase-admin";

export const determineDialogError = (
  error: FirebaseError | unknown,
  setDialogError: React.Dispatch<
    React.SetStateAction<{
      title: string | JSX.Element;
      content: string | JSX.Element;
    } | null>
  >
) => {
  if (error === undefined || error.code === undefined) {
    return setDialogError({
      title: "Internal Server Error",
      content:
        "An unexpected internal server has occurred. Please try again later",
    });
  }

  switch (error.code) {
    // SIGNUP ERRORS
    case "auth/email-already-in-use":
      return setDialogError({
        title: "Email already in use",
        content:
          "The provided email is already in use by another user. Please use another email address",
      });

    case "auth/email-already-exists":
      return setDialogError({
        title: "Email already in use",
        content:
          "The provided email is already in use by another user. Please use another email address",
      });
    case "auth/invalid-display-name		":
      return setDialogError({
        title: "Invalid Username",
        content: "Your provided username is invalid",
      });
    case "auth/invalid-email":
      return setDialogError({
        title: "Invalid Email",
        content: "Your provided email is invalid",
      });
    case "auth/invalid-password":
      return setDialogError({
        title: "Invalid Password",
        content: "Your provided password is invalid",
      });
    case "auth/uid-already-exists":
      return setDialogError({
        title: "Email already in use",
        content:
          "The provided email is already in use by another user. Please use another email address",
      });

    //LOGIN ERRORS
    case "auth/user-not-found" || "wrong-email":
      return setDialogError({
        title: "No user found",
        content: "No user that has that email address has been found",
      });

    case "auth/wrong-password" || "wrong-email":
      return setDialogError({
        title: "Wrong Email or Password",
        content: "Your provided email or password is wrong",
      });

    default:
      return setDialogError({
        title: "Internal Server Error",
        content:
          "An unexpected internal server has occurred. Please try again later",
      });
  }
};

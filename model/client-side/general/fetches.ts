import { FirebaseError } from "firebase-admin";
import { User } from "firebase/auth";
import { LoginStatus } from "../../../typings/typings";

export const fetchUserStatus = async (
  user: User | null | undefined
): Promise<LoginStatus> => {
  if (!user) return "not logged in";
  try {
    const token = await user.getIdToken();
    const fetchRes = await fetch(
      `${process.env.NEXT_PUBLIC_server}/api/checkUserStatus`,
      { method: `POST`, body: token }
    );
    if (fetchRes === undefined) return "unknown";
    console.log("error at fetching user. No server response");

    const { status } = await fetchRes.json();
    return status;
  } catch (error) {
    console.log("error at fetching user", error);
    return "unknown";
  }
};

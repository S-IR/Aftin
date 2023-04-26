import { FirebaseError } from "firebase-admin";
import { User } from "firebase/auth";
import { LoginStatus } from "../../../typings/typings";

/**
 * Fetches the subscription tier of the user from the server
 * @param user the firebase user that is going to get fetched
 * @returns {LoginStatus} the subscription tier of the user
 */
export const fetchUserStatus = async (
  user: User | null | undefined
): Promise<LoginStatus> => {
  if (!user) return "not logged in";
  try {
    const token = await user.getIdToken();

    const fetchRes = await fetch(
      `${process.env.NEXT_PUBLIC_server}/api/users/user-status`,
      { method: `POST`, body: token }
    );
    if (fetchRes === undefined) {
      // console.log("error at fetching user. No server response");
      return undefined;
    }

    const { status } = await fetchRes.json();
    return status;
  } catch (error) {
    return undefined;
  }
};

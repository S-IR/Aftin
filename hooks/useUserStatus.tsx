import { User } from "firebase/auth";
import { useState } from "react";

const useUserStatus = (user: User | null | undefined) => {
  const [userStatus, setUserStatus] = useState<
    | null
    | "not logged in"
    | "unknown"
    | "unauthorized"
    | "bronze"
    | "silver"
    | "gold"
  >(null);
  const fetchUserStatus = async () => {
    if (!user) return { status: "success", userStatus: "not logged in" };
    try {
      const token = await user.getIdToken();
      const fetchRes = await fetch(
        `${process.env.NEXT_PUBLIC_server}/api/checkUserStatus`,
        { method: `POST`, body: token }
      );
      if (fetchRes === undefined) return setUserStatus("unknown");
      const { status } = await fetchRes.json();
      return setUserStatus(status);
    } catch (error) {
      console.log("error at fetching user status", error);
      return setUserStatus("unknown");
    }
  };
  fetchUserStatus();
  return [userStatus, fetchUserStatus];
};

export default useUserStatus;

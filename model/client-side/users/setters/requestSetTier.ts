import { auth } from "../../../../firebase";
import { tier_array } from "../../../../typings/image-types/ImageTypes";

export const requestSetTier = async (
  token: string,
  tier: (typeof tier_array)[number]
) => {
  console.log("requestSetTier called");

  const res = await fetch("/api/users/tier/set-tier", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tier }),
  });

  if (!res.ok) {
    throw new Error(`Failed to set tier: ${res.statusText}`);
  } else {
    if (auth.currentUser === null)
      throw new Error("current user is null, at requestSetTier");
    await auth.currentUser.getIdToken(true);
  }
};

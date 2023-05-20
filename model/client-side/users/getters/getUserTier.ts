import { User } from "firebase/auth";
import { tier_array } from "../../../../typings/image-types/ImageTypes";

export const getUserTier = async (
  user: User
): Promise<(typeof tier_array)[number] | "unknown"> => {
  if (!user) return "unknown";
  try {
    const idTokenResult = await user.getIdTokenResult();
    const subscriptionStatus = idTokenResult.claims.subscription;
    return subscriptionStatus;
  } catch (error) {
    console.error("Error getting user tier:", error);
    return "unknown";
  }
};

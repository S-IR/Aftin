import admin from "../../../firebaseAdmin";
import { tier_array } from "../../../typings/image-types/ImageTypes";

export async function setUserTier(
  userId: string,
  tier: (typeof tier_array)[number]
) {
  await admin.auth().setCustomUserClaims(userId, { tier: tier });
}

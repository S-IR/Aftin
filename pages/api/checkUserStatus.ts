import * as admin from "firebase-admin";
import { doc, getDoc } from "firebase/firestore";

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { getUserTier } from "../../firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.body === "string") {
    const token = req.body as string;

    const userTier = await getUserTier(token as string);

    return res.status(200).json({ status: userTier });
  } else {
    res.status(200).json({ status: "not logged in" });
  }
}

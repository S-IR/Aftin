import { auth } from "firebase-admin";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { NextApiRequest, NextApiResponse } from "next";

import { sendPasswordReset, sendVerificationEmail } from "../../firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.body === "string") {
    const token = req.body as string;
    const firebaseRes = await auth().verifyIdToken(token);

    if (!firebaseRes) return res.status(403).json({ status: "unauthorized" });
    if (firebaseRes) return res.status(200).json({ status: "success" });
  } else {
    res.status(401).json({ status: "not logged in" });
  }
}

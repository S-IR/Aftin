import { NextApiRequest, NextApiResponse } from "next";
import admin from "../firebaseAdmin";

export const authenticateRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ uid: string } | null> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized");
    return null;
  }

  const idToken = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return { uid: decodedToken.uid };
  } catch (error) {
    res.status(401).send("Unauthorized");
    return null;
  }
};

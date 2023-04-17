import { NextApiRequest, NextApiResponse } from "next";
import { getUserTier } from "../firebaseAdmin";
import { NextResponse } from "next/server";

export function checkAuthHeader(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return true;
  } else {
    return false;
  }
}

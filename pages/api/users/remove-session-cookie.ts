import { cookies } from "next/headers";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { auth } from "firebase-admin";
import { getAuth } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  deleteCookie("session");
  console.log("session cookie removed!");

  res.status(200).json({ message: "Successfully removed cookie!" });
}

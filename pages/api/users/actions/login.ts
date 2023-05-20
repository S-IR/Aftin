import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.token;
  if (typeof token !== "string") {
    res.status(400).send("Bad request");
    return null;
  }
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("LOGIN_DATA", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600 * 72,
      path: "/",
    })
  );
  res.status(200).json({ message: "Success!" });
}

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
  console.log("set-session-cookie reached");

  const idToken = req.body.token;
  if (!idToken) {
    res.status(401).send("UNAUTHORIZED REQUEST");
    return;
  }

  const expiresIn = 60 * 60 * 24 * 14 * 1000;
  auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = {
          req,
          res,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };
        setCookie("session", sessionCookie, options);
        res.status(200).json({ message: "Successfully set cookie!" });
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
}

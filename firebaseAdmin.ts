import * as admin from "firebase-admin";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import sgMail from "@sendgrid/mail";
import { ActionCodeSettings } from "firebase/auth";

const ejs = require("ejs");

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
      }),
      databaseURL: "https://aftin-3516f-default-rtdb.firebaseio.com",
    });
  } catch (error) {
    console.log("firebase admin initialization error", error);
  }
}
export default admin
/**
 * Backend function that gets the user's payment tier level
 * @param token firebase JWT token of the user
 * @returns
 */
export const getUserTier = async (
  token: string | undefined
): Promise<"bronze" | "silver" | "gold" | "unauthorized"> => {
  if (token === undefined) return "unauthorized";
  let userTier: "bronze" | "silver" | "gold" | "unauthorized" = "bronze";
  await admin
    .auth()
    .verifyIdToken(token)
    .then(async (decodedIdToken) => {
      const docRef = doc(db, "users", decodedIdToken.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userTier = docSnap.data().tier;
      } else {
        // doc.data() will be undefined in this case
        userTier = "unauthorized";
      }
    })
    .catch((error) => {
      userTier = "unauthorized";
      console.log(`error while verifying token :`, error);
    });
  return userTier;
};
// SEND VERIFY EMAIL FUNCTION

/**
 * Sends an email verification to the user's email adress
 * @param userEmail User's email
 * @param actionCodeSettings Settings that generate the action link
 * @returns
 */
export async function sendVerificationEmail(
  userEmail: string,
  actionCodeSettings: ActionCodeSettings
) {
  try {
    const actionLink = await admin
      .auth()
      .generateEmailVerificationLink(userEmail, actionCodeSettings);
    const template = await ejs.renderFile("./emails/verify-email.ejs", {
      actionLink,
      randomNumber: Math.random(),
    });
    const SENDGRID_KEY = process.env.SENDGRID_SENDMAIL as string;
    const VERIFIED_EMAIL = process.env.VERIFIED_SENDER as string;

    sgMail.setApiKey(SENDGRID_KEY);
    const message = {
      from: {
        name: "Custom verify",
        email: VERIFIED_EMAIL,
      },
      to: userEmail,
      subject: "Verify your email address",
      text: `Thanks for signing up with us. Follow the link below to verify your email address.
    \n\n${actionLink} \n\nIf this email wasn't intended for you feel free to delete it.`,
      html: template,
    };
    return sgMail.send(message);
  } catch (error) {
    console.log("error at sendVerifcationEmail:", error.message);
  }
}

export async function sendPasswordReset(
  userEmail: string,
  actionCodeSettings: ActionCodeSettings
) {
  try {
    const actionLink = await admin
      .auth()
      .generatePasswordResetLink(userEmail, actionCodeSettings);
    const template = await ejs.renderFile("./emails/verify-email.ejs", {
      actionLink,
      randomNumber: Math.random(),
    });
    const SENDGRID_KEY = process.env.SENDGRID_SENDMAIL as string;
    const VERIFIED_EMAIL = process.env.VERIFIED_SENDER as string;

    sgMail.setApiKey(SENDGRID_KEY);
    const message = {
      from: {
        name: "Custom verify",
        email: VERIFIED_EMAIL,
      },
      to: userEmail,
      subject: "Reset your password",
      text: `Follow this link in order to reset your password.
      \n\n${actionLink} \n\nIf this email wasn't intended for you feel free to delete it.`,
      html: template,
    };
    return sgMail.send(message);
  } catch (error) {
    console.log("error at sendVerifcationEmail:", error.message);
  }
}

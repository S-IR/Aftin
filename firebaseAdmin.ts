import * as admin from "firebase-admin";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import sgMail from "@sendgrid/mail";
import { ActionCodeSettings } from "firebase/auth";

const serviceAccount = require("./serviceAccountKey.json");
const ejs = require("ejs");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aftin-3516f-default-rtdb.firebaseio.com",
  });
}

/**
 * Gets the user's payment tier level
 * @param token firebase JWT token of the user
 * @returns
 */
export const getUserTier = async (
  token: string
): Promise<"bronze" | "silver" | "gold" | "unauthorized"> => {
  let userTier: "bronze" | "silver" | "gold" | "unauthorized" = "bronze";
  await admin
    .auth()
    .verifyIdToken(token)
    .then(async (decodedIdToken) => {
      const docRef = doc(db, "users", decodedIdToken.uid);
      const docSnap = await getDoc(docRef);
      console.log("token", token, "docSnap.exists()", docSnap.exists());
      if (docSnap.exists()) {
        userTier = docSnap.data().subscriptionLevel;
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
    const isValidEmail = admin.auth().fetch;
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

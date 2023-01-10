
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import { NextApiRequest, NextApiResponse } from "next";

import { auth } from 'firebase-admin';
import { sendVerificationEmail } from '../../firebaseAdmin';

const ejs = require('ejs')


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  type reqBody = { userEmail: string | undefined, redirectUrl: string | undefined }
  const { userEmail, redirectUrl }: reqBody = req.body
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if (!userEmail || !userEmail.match(emailValidate) || !redirectUrl) return res.status(401).send({ message: 'No email provided' })

  try {
    const actionCodeSettings = {
      url: redirectUrl
    }
    await sendVerificationEmail(userEmail, actionCodeSettings)
    return res.status(200).json({message: 'successful'})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}

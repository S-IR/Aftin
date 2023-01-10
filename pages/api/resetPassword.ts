import * as admin from 'firebase-admin';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { verify } from 'jsonwebtoken';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import { NextApiRequest, NextApiResponse } from "next";
import { db } from '../../firebase';
import { getUserTier, verifyUserTier } from '../../firebaseAdmin';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  type reqBody = {email: string| undefined, url: string | undefined}
  const {email, url}: reqBody = req.body.email
  const emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  if(!email || !email.match(emailValidate) || !url) return res.status(401).send({message: 'No email prvided'})

  const actionCodeSettings = {
    url: url
  }
  admin.auth().generatePasswordResetLink(email, actionCodeSettings)
  .then((link)=> {
    return sendcustom
  })
  
  }


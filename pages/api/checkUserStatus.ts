import * as admin from 'firebase-admin';
import { doc, getDoc } from 'firebase/firestore';
import { verify } from 'jsonwebtoken';


import { NextApiRequest, NextApiResponse } from "next";
import { db } from '../../firebase';
import { getUserTier, verifyUserTier } from '../../firebaseAdmin';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.cookies.LOGIN_DATA)
  
  if (req.cookies.LOGIN_DATA) {
    const LOGIN_DATA = req.cookies.LOGIN_DATA as string;

    const userTier = await getUserTier(LOGIN_DATA as string)
        
    if(userTier === 'unauthorized'){
      return res.status(403).send({loginStatus: 'unauthorized'})
    }
    return res.status(200).send({loginStatus: userTier})
  }
  else {
    res.status(200).send({loginStatus: 'not logged in'})
  }
}
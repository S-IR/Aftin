import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie'
import {sign} from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const token = req.headers.token   
    res.setHeader('Set-Cookie', cookie.serialize('LOGIN_DATA', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3600*72,
      path: '/'
    }))
    res.status(200).json({message: "Success!"});

    


}
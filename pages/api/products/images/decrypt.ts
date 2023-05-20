import { NextApiRequest, NextApiResponse } from "next";
import { decryptImageUrl } from "../../../../model/server-side/general/encryptURL";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const encryptedImageUrl = req.query.encryptedImageUrl;
  if(encryptedImageUrl === undefined || Array.isArray(encryptedImageUrl)) return res.status(400).json({message: 'invalid encryptedImageUrl'})
  const decryptedImageUrl = decryptImageUrl(encryptedImageUrl);
  res.status(200).json({ imageUrl: decryptedImageUrl });
}
import { NextApiRequest, NextApiResponse } from "next";
import {
  decryptImageUrl,
  encryptImageUrl,
} from "../../../../model/server-side/general/encryptURL";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url;
  if (url === undefined || Array.isArray(url))
    return res.status(400).json({ message: "invalid encryptedImageUrl" });
  const encryptedUrl = encryptImageUrl(url);
  res.status(200).json({ imageUrl: encryptedUrl });
}

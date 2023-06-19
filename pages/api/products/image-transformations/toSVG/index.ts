import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { makeID } from "../../../../model/GeneralFunctions";
import potrace from "potrace";
import sharp from "sharp";
import { getUserTier } from "../../../../../firebaseAdmin";
import { paid_tier_array } from "../../../../../typings/image-types/ImageTypes";

const bodySchema = z.object({
  image: z.any(),
});
async function generateSVG(buffer: Buffer) {
  return new Promise((resolve, reject) => {
    potrace.posterize(buffer, (err, svg) => {
      if (err) {
        reject(err);
      } else {
        resolve(svg);
      }
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("reached toSVG");

  if (req.method !== "POST") {
    return res.status(400).json({ message: "Bad Request" });
  }
  // if (!checkAuthHeader(req, res)) {
  //   return res
  //     .status(401)
  //     .json({ message: "Missing or invalid authorization header" });
  // }
  //ignore ts on req.token. the checkAuthHeaders should put the user token in req object
  const userTier = await getUserTier(req.token);

  const parseResult = bodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error });
  }
  console.log("reached toSVG main code");

  const beforeImage = req.body.image.replace(/^data:image\/png;base64,/, "");

  // Convert the base64 image to a buffer
  const buffer = Buffer.from(beforeImage, "base64");
  const metadata = await sharp(buffer).metadata();
  const { width, height } = metadata;

  //if the width and height are greater summed up than 768 by 768 and the user is not premium return unauthorized
  if (width * height > 589824 && !paid_tier_array.includes(userTier)) {
    return res.status(401).json({
      message:
        "Image is too large for your tier. Please send a smaller sized image or increase your subscription level in order to proceed.",
    });
  }
  // Convert the image to SVG using potrace
  try {
    const svg = await generateSVG(buffer);
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    res.status(500).json({ error: "Error converting image to SVG" });
  }

  // Set the content type header to image/svg+xml
  // Send the SVG as the response body
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "16mb",
      responseLimit: false,
    },
  },
};

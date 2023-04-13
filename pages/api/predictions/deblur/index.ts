import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { deblurModelTypes } from "../../../../constants/image-enhancing/enhancingTypes";

const bodySchema = z.object({
  model: z.enum(deblurModelTypes, { invalid_type_error: "Invalid Model Type" }),
  image: z.any(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Bad Request" });
  }

  const parseResult = bodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error });
  }

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Pinned to a specific version of Stable Diffusion
      // See https://replicate.com/stability-ai/stable-diffussion/versions
      version:
        "f2d6b24e6002f25f77ae89c2b0a5987daa6d0bf751b858b94b8416e8542434d1",

      // This is the text prompt that will be submitted by a form on the frontend
      input: {
        model: req.body.model,
        image: req.body.image,
      },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};

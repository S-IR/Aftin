import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const bodySchema = z.object({
  image: z.any(),
  text: z
    .string()
    .min(1, "The prompt cannot be empty")
    .max(256, "Prompt is too big"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" || req.body.image === undefined) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const parseResult = bodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error });
  }
  console.log("gotten text", req.body.text);

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
        image: req.body.image,
        text: req.body.text,
        iterations: 1,
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

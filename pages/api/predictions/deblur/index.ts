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
  if (req.method !== "POST" || req.body.image === undefined) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (bodySchema.safeParse(req.body).success === false) {
    return res
      .status(400)
      .json({ message: bodySchema.safeParse(req.body).error });
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
        "494ca4d578293b4b93945115601b6a38190519da18467556ca223d219c3af9f9",

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

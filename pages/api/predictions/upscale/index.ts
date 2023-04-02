import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`REPLICATE_API_TOKEN`, process.env.REPLICATE_API_TOKEN);

  if (req.method !== "POST" || req.body.image === undefined) {
    console.log("bad request at upscale API");

    return res.status(400).json({ message: "Bad Request" });
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
        "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",

      // This is the text prompt that will be submitted by a form on the frontend
      input: {
        task_type: "Real-World Image Super-Resolution-Large",
        noise: 15,
        jpeg: 40,
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

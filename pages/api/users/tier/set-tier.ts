import { NextApiRequest, NextApiResponse } from "next";
import { authenticateRequest } from "../../../../middleware/auth.middleware";
import { setUserTier } from "../../../../model/server-side/firebase/userTiers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("set tier API endpoint reached");

  const user = await authenticateRequest(req, res);

  if (!user) {
    return;
  }

  const userId = user.uid;
  const tier = req.body.tier;
  if (userId === undefined || tier === undefined) {
    res.status(400).send("Bad request");
  }
  // Replace this with your implementation for setting the user's tier
  await setUserTier(userId, tier);

  res.status(200).send(`Tier set to ${tier}`);
};

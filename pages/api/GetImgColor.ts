import type { NextApiRequest, NextApiResponse } from 'next';
const getColors = require('get-image-colors')


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const colors = getColors(`D:\Utilities\react\aftin.net\public\frontend-used-images\aftin-logo.png`)
  res.status(200).send(colors)

}
import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function (
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log("see me", request);
}

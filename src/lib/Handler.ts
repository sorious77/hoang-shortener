import { NextApiRequest, NextApiResponse } from "next";

type Method = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export default function Handler(
  method: Method,
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method != method) {
      return res.status(405).end();
    }

    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error });
    }
  };
}

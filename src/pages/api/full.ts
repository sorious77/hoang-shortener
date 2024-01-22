import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection, query, where } from "@firebase/firestore";
import { db } from "@/lib/firebaseClient";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;

    if (typeof url === "object" || typeof url === "undefined") throw Error("");

    const shortUrl = encodeURIComponent(url);

    const querySnapShot = await getDocs(
      query(collection(db, "urls"), where("shortUrl", "==", shortUrl))
    );

    const urls: string[] = [];

    querySnapShot.forEach((doc) => urls.push(doc.data().originUrl));

    let originUrl = "";
    if (urls[0]) {
      return res.status(200).json({ url: urls[0] });
    } else {
      return res.status(404).json({ message: "cannot find url" });
    }
  } catch (e) {
    return res.status(404).json({ message: "server error" });
  }
};

export default GET;

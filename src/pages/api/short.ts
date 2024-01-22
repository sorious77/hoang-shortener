import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { doc, getDocs, collection, query, where } from "@firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Url } from "@/types/Url";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;

    if (typeof url === "object" || typeof url === "undefined") throw Error("");

    const originUrl = encodeURIComponent(url);

    try {
      const querySnapShot = await getDocs(
        query(collection(db, "urls"), where("originUrl", "==", originUrl))
      );

      const urls: string[] = [];

      querySnapShot.forEach((doc) => urls.push(doc.data().shortUrl));

      let shortUrl = "";
      if (urls[0]) {
        // 있다면 찾은걸 return
        shortUrl = urls[0];
      } else {
        // 없다면 새로 insert 후 return
      }

      return res.status(200).json({ url: urls[0] });
    } catch (e) {
      return res.status(200).json({ message: "error!!" });
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({ message: "server error" });
  }
};

export default GET;

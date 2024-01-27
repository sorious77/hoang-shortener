import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  doc,
  getDocs,
  collection,
  query,
  where,
  getDoc,
  setDoc,
  addDoc,
} from "@firebase/firestore";
import { db } from "@/lib/firebaseClient";
import { Url } from "@/types/Url";

const getSequence = async (): Promise<number> => {
  const result = await getDoc(
    doc(db, "sequences", process.env.NEXT_PUBLIC_SEQUENCE_ID || "")
  );

  if (result.exists()) {
    const sequence = result.data().sequence;

    await setDoc(
      doc(db, "sequences", process.env.NEXT_PUBLIC_SEQUENCE_ID || ""),
      {
        sequence: sequence + 1,
      }
    );

    return sequence;
  } else {
    throw new Error("server error");
  }
};

const shortenURL = async (): Promise<string> => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortenedURL = "";

  try {
    let sequence = await getSequence();

    while (sequence > 0) {
      shortenedURL = characters[sequence % 62] + shortenedURL;
      sequence = Math.floor(sequence / 62);
    }

    while (shortenedURL.length < 7) {
      shortenedURL = "A" + shortenedURL;
    }

    return shortenedURL;
  } catch (e) {
    throw e;
  }
};

const removeProtocolFromURL = (url: string): string => {
  const protocolRegex = /^(https?:\/\/)/i;
  return url.replace(protocolRegex, "");
};

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;

    if (typeof url === "object" || typeof url === "undefined") throw Error("");

    const originUrl = encodeURIComponent(removeProtocolFromURL(url));

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
      shortUrl = await shortenURL();

      // insert
      await addDoc(collection(db, "urls"), {
        originUrl,
        shortUrl,
      });
    }

    return res.status(200).json({ url: shortUrl });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ message: "server error" });
  }
};

export default GET;

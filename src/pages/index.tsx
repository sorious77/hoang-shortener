import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Shortener() {
  const [originUrl, setOriginUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const router = useRouter();

  const goShorten = async (e: FormEvent) => {
    e.preventDefault();
    setShortUrl("");

    try {
      const {
        data: { url },
      } = await axios(`/api/short?url=${originUrl}`);

      console.log(window.location.origin);

      setShortUrl(`${window.location.origin}/${url}`);
    } catch (e) {
      alert("Server has an error!");
    }
  };

  return (
    <Card className="w-full sm:max-w-lg mx-auto mt-4 sm:mt-10 px-2 sm:px-4 py-4 sm:py-6 rounded-xl shadow-lg  text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl sm:font-semibold sm:text-3xl">
          URL Shortener
        </CardTitle>
      </CardHeader>
      <CardContent className="border-t border-gray-300 pt-4">
        <form className="space-y-4" onSubmit={goShorten}>
          <div className="space-y-2">
            <Label className="sr-only" htmlFor="url">
              URL
            </Label>
            <Input
              className="border rounded-md h-10 bg-white text-black"
              id="url"
              placeholder="Paste your long URL here"
              required
              type="url"
              onChange={(e) => setOriginUrl(e.target.value)}
            />
          </div>
          <Button className="w-full py-2 rounded-md bg-white hover:bg-gray-200 text-black">
            Shorten
          </Button>
        </form>
      </CardContent>
      <CardFooter className="border-t border-gray-300 pt-4">
        <div className="flex items-center justify-between w-full">
          <Input
            className="border rounded-md h-10 flex-grow bg-white text-black"
            id="short-url"
            placeholder="Your shortened URL will appear here"
            readOnly
            type="url"
            value={shortUrl}
          />
          <Button
            className="ml-3 px-4 py-2 rounded-md bg-white text-black hover:bg-gray-200"
            size="sm"
            variant="outline"
            onClick={async () => {
              await navigator.clipboard.writeText(shortUrl);
              alert("Copied!");
            }}
          >
            <CopyIcon className="w-4 h-4 mr-1" />
            Copy
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function CopyIcon(props: ClassName) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

interface ClassName {
  className: string;
}

import axios from "axios";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  const { page } = router.query;

  useEffect(() => {
    const getFullUrl = async () => {
      if (!page) return;

      try {
        const {
          data: { url: fullUrl },
        } = await axios(`/api/full?url=${page}`);

        router.push(`https://${decodeURIComponent(fullUrl)}`);
      } catch (e) {
        router.replace("/404");
      }
    };

    getFullUrl();
  }, [page]);

  return (
    <main className="flex items-center justify-center h-screen  text-white">
      <section className="max-w-2xl mx-auto mt-10 px-4 py-6 text-center">
        <h1 className="font-semibold text-6xl">Redirecting . . .</h1>
      </section>
    </main>
  );
};

export default Page;

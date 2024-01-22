import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen text-white">
      <section className="max-w-2xl mx-auto mt-10 px-4 py-6 text-center">
        <h1 className="font-semibold text-6xl">404</h1>
        <p className="mt-4 text-xl">
          Sorry, the page you're looking for cannot be found.
        </p>
        <Button
          className="mt-6 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-500 transition-colors duration-200 py-2 px-6 rounded-full"
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </Button>
      </section>
    </main>
  );
};

export default Error;

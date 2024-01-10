import { getServerSideProps } from "next/dist/build/templates/pages";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const { page } = router.query;

  return <div>page~ {page}</div>;
};

export default Page;

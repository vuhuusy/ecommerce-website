import CategoryContainer from "@/components/CategoryContainer";
import HomeBanar from "@/components/HomeBanar";
import OfferBanar from "@/components/OfferBanar";
import PopularProducts from "@/components/PopularProducts";
import UtilsContainer from "@/components/UtilsContainer";
import CustomerLayout from "@/layouts/customerLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Home() {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (query?.token) {
      document.cookie = `harriShop=${query.token}; Path=/;`;
      router.push("/");
    }
  }, [query]);
  return (
    <>
      <Head>
        <title>Wellcome to HarriShop</title>
      </Head>
      <main>
        <div>
          <HomeBanar />
          <CategoryContainer />
          <PopularProducts />
          <OfferBanar />
          <UtilsContainer />
        </div>
      </main>
    </>
  );
}

Home.getLayout = (page) => {
  return <CustomerLayout>{page}</CustomerLayout>;
};
export default Home;

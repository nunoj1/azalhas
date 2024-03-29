import { type NextPage } from "next";
import Head from "next/head";

import TimeLine from "../components/Timeline/TimeLine";




const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fundação Azalhas</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-[15%]">
        <TimeLine />
      </main>
    </>
  );
};

export default Home;



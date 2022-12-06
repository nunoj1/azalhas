import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Typography from '@mui/material/Typography';

import { trpc } from "../utils/trpc";
import TimeLine from "../components/Timeline/TimeLine";
import { useEffect } from "react";




const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fundação Azalhas</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-[15%]">
        {/* <HomeCards /> */}
        <TimeLine />
      </main>
    </>
  );
};

export default Home;



import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Sidebar session={session}/>
      <div className="w-full min-h-full flex flex-row">
        {/*  Fake SideBar */}
        <div className="w-[50px] min-h-screen"></div>

        <div className="w-full min-h-[25%]">
          <Header/>

            <Component {...pageProps} />

        </div>
      </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

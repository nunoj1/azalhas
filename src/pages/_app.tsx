import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { useState } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer";
import ButtonTop from "../components/Buttons/ButtonTop";

const MyApp: AppType<{ session: Session | null }> = ({
  Component, router,
  pageProps: { session, ...pageProps },
}) => {

  const [active,setActive]=useState(0);

  const animation = {
    name: 'Slide Right',
    variants: {
      initial: {
        opacity: 0,
        left: '-100%',
        scale: 0.6
      },
      animate: {
        opacity: 1,
        left: 0,
        scale: 1
      },
      exit: {
        opacity: 0,
        left: '100%',
        scale: 0.6
      }
    },
    transition: {
      duration: 0.3
    }
  }

  return (
    <SessionProvider session={session}>
      <Sidebar session={session} />
      <div className="w-full min-h-full flex flex-row">
        {/*  Fake SideBar */}
        <div className="w-[50px] min-h-screen"></div>
        <div className="w-full min-h-[25%]">
          <Header active={active} setActive={setActive} />
          <LazyMotion features={domAnimation}>
            <AnimatePresence exitBeforeEnter>
              <m.div
                key={router.route.concat(animation.name)}
                className="page-wrap"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animation.variants}
                transition={animation.transition}
              >
                <Component {...pageProps} active={active}/>
                <ButtonTop/>
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </div>
      </div >
    </SessionProvider >
  );
};

export default trpc.withTRPC(MyApp);

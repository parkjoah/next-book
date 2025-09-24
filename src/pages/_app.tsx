import GloblalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // const router = useRouter();
  // const onClickBtn = () => {
  //   router.push("/test");
  // };

  // useEffect(() => {
  //   router.prefetch("/test");
  // }, []);

  // return (
  //   <>
  //     <header>
  //       <Link href={"/"}>index</Link>
  //       &nbsp;
  //       <Link href={"/search"}>search</Link>
  //       &nbsp;
  //       <Link href={"/book/1"}>book/1</Link>
  //       <div>
  //         <button onClick={onClickBtn}>/test 페이지로 이동</button>
  //       </div>
  //     </header>
  //     <Component {...pageProps} />
  //   </>
  // );

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return (
    <>
      <GloblalLayout>{getLayout(<Component {...pageProps} />)}</GloblalLayout>
    </>
  );
}

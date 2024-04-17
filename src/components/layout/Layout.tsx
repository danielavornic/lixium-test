import clsx from "clsx";
import { Inter } from "next/font/google";
import Head from "next/head";
import { PropsWithChildren } from "react";

import { Sidebar } from "@/components/layout";

interface LayoutProps {
  title: string;
}

const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={clsx("flex h-screen w-full bg-slate-950 text-white", inter.className)}>
        <div className="container flex">
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
};

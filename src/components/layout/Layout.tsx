import clsx from "clsx";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { Sidebar } from "@/components/layout";
import { TweetModal } from "@/components/tweets";

const inter = Inter({ subsets: ["latin"] });

export const Layout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  const { query } = useRouter();
  const { createTweet } = query;
  const editTweet = query.editTweet as string;
  const showModal = createTweet || editTweet;

  return (
    <>
      <Head>
        <title>{title} / Twitter</title>
      </Head>
      <div className={clsx("flex min-h-screen w-full bg-zinc-950 text-white", inter.className)}>
        <div className="container flex max-w-screen-xl pr-3 xl:pr-0">
          <Sidebar />
          <main className="ml-16 w-full overflow-y-auto py-4 pl-10 md:ml-[250px]">{children}</main>
        </div>
        {showModal && <TweetModal tweetId={editTweet} />}
      </div>
    </>
  );
};

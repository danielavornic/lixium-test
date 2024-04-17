import { useQuery } from "@tanstack/react-query";

import { tweetsApi } from "@/api";
import { Layout } from "@/components/layout";
import { TweetCard } from "@/components/tweets";
import { Tweet } from "@/types";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["tweets"],
    queryFn: tweetsApi.getTweets
  });

  return (
    <Layout title="Home">
      <h1 className="text-2xl font-bold">Home</h1>

      <section className="mt-8 space-y-4">
        {data?.map((tweet: Tweet) => <TweetCard key={tweet.id} tweet={tweet} />)}
      </section>
    </Layout>
  );
}

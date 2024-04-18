import { axios } from "@/lib";
import { Tweet } from "@/types";

export const tweetsApi = {
  getTweets: async () => {
    const { data } = await axios.get("/tweets");
    return data.sort((a: Tweet, b: Tweet) => (a.updatedAt > b.updatedAt ? -1 : 1));
  },
  getTweet: async (id: string) => {
    const { data } = await axios.get(`/tweets/${id}`);
    return data;
  },
  createTweet: async (tweet: { content: string; author: string }) => {
    const { data } = await axios.post("/tweets", tweet);
    return data;
  },
  updateTweet: async (id: string, tweet: { content: string; author: string }) => {
    const { data } = await axios.patch(`/tweets/${id}`, tweet);
    return data;
  },
  deleteTweet: async (id: string) => {
    const { data } = await axios.delete(`/tweets/${id}`);
    return data;
  }
};

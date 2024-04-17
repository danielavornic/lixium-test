import { axios } from "@/lib";

export const tweetsApi = {
  getTweets: async () => {
    const { data } = await axios.get("/tweets");
    return data;
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

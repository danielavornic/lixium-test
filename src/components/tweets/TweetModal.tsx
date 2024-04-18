import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import TextareaAutosize from "react-textarea-autosize";

import { tweetsApi } from "@/api";
import { Button } from "@/components/common";

type TweetFormData = {
  content: string;
};

const onError = () => {
  toast.error("Failed to tweet. Please try again later.");
};

export const TweetModal = ({ tweetId }: { tweetId?: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus
  } = useForm<TweetFormData>({
    mode: "onChange"
  });

  const contentValue = watch("content");

  const {
    data: tweet,
    isLoading: isTweetLoading,
    isFetching: isTweetFetching,
    isError: isTweetError
  } = useQuery({
    queryKey: ["tweets", tweetId],
    queryFn: () => tweetsApi.getTweet(tweetId as string),
    enabled: !!tweetId
  });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["tweets"] });
    router.push("/");
    toast.success(tweetId ? "Tweet updated successfully!" : "Tweeted successfully!");
  };

  const { mutate: postTweet, isPending: isPostingPending } = useMutation({
    mutationFn: (data: TweetFormData) =>
      tweetsApi.createTweet({
        author: "oomf",
        content: data.content
      }),
    onSuccess,
    onError
  });

  const { mutate: updateTweet, isPending: isUpdatingPending } = useMutation({
    mutationFn: (data: TweetFormData) =>
      tweetsApi.updateTweet(tweetId as string, {
        author: "oomf",
        content: data.content
      }),
    onSuccess,
    onError
  });

  const onSubmit = (data: TweetFormData) => {
    if (!tweet) {
      postTweet(data);
    } else {
      updateTweet(data);
    }
  };

  const isBtnDisabled =
    !!errors.content ||
    isPostingPending ||
    isUpdatingPending ||
    isTweetLoading ||
    isTweetFetching ||
    tweet?.content === contentValue;

  useEffect(() => {
    if (tweet) {
      setValue("content", tweet.content);
    }
    // If it is a new tweet or the tweet is already fetched, focusnv
    if (!tweetId || (!isTweetLoading && !isTweetFetching)) {
      setFocus("content");
    }
  }, [tweet, setValue, setFocus, tweetId, isTweetLoading, isTweetFetching]);

  if (isTweetError) {
    toast.error("Failed to fetch tweet. Please try again later.");
    router.push("/");
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-20 h-screen w-full">
      <form
        className="relative z-20 mx-auto h-screen w-full bg-zinc-950 px-4 md:mt-[4%] md:h-auto md:max-h-[80vh] md:min-h-[300px] md:max-w-[600px] md:rounded-xl md:pb-10"
        onSubmit={handleSubmit(onSubmit)}
        role="dialog"
        title="Tweet Modal"
        aria-label="Tweet Modal"
      >
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            role="button"
            className="rounded-full p-2 text-2xl text-white transition-all hover:bg-zinc-700"
            title="Close Modal"
            aria-label="Close Modal"
          >
            <FiX size={18} />
          </Link>
          <Button size="md" type="submit" disabled={isBtnDisabled} aria-label="Tweet Button">
            {tweet ? "Update" : "Tweet"}
          </Button>
        </div>

        <div className="flex space-x-4">
          {isTweetLoading || isTweetFetching ? (
            <div className="block h-10 min-w-10 animate-pulse rounded-full bg-blue-300" />
          ) : tweet ? (
            <div
              className="flex h-10 min-w-10 items-center justify-center space-x-2 rounded-full bg-blue-300 font-semibold"
              title={tweet.author}
            >
              {tweet.author[0].toUpperCase()}
            </div>
          ) : (
            <img
              src="/images/pfp.jpg"
              className="block h-10 min-w-10 rounded-full"
              alt="Profile Picture"
            />
          )}
          <TextareaAutosize
            className="max-h-[600px] min-h-[200px] w-full resize-none bg-transparent text-lg text-white focus:outline-none"
            placeholder="What's happening?!"
            {...register("content", { required: "Content is required", maxLength: 280 })}
          />
        </div>
      </form>

      <Link
        href="/"
        className="absolute top-0 h-screen w-full cursor-default bg-white bg-opacity-20"
        title="Close Modal"
        aria-label="Close Modal"
      />
    </div>
  );
};

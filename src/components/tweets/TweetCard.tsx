import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import { tweetsApi } from "@/api";
import { useClickOutside } from "@/hooks";
import { Tweet } from "@/types";
import { formatTweetTime } from "@/utils";

export const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  const { author, createdAt, updatedAt, content } = tweet;
  const isEdited = createdAt !== updatedAt;

  const router = useRouter();
  const queryClient = useQueryClient();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { mutate: deleteTweet } = useMutation({
    mutationFn: () => tweetsApi.deleteTweet(tweet.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets"] })
  });

  const handleEdit = () => {
    setIsPopoverOpen(false);
    router.push(`/?editTweet=${tweet.id}`);
  };

  const handleDelete = () => {
    setIsPopoverOpen(false);
    const isConfirmed = window.confirm("Are you sure you want to delete this tweet?");
    if (isConfirmed) {
      deleteTweet();
    }
  };

  const tweetActions = [
    {
      label: "Edit",
      onClick: handleEdit
    },
    {
      label: "Delete",
      className: "text-red-500",
      onClick: handleDelete
    }
  ];

  useClickOutside(cardRef, () => setIsPopoverOpen(false));

  return (
    <div
      className="relative flex w-full space-x-4 rounded-lg border border-zinc-700 bg-transparent px-2 py-3"
      ref={cardRef}
    >
      <div
        className="flex h-10 min-w-10 items-center justify-center space-x-2 rounded-full bg-blue-300 font-semibold"
        title={author}
      >
        {author[0].toUpperCase()}
      </div>

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex flex-wrap items-center">
            <p className="text-sm font-semibold">{author}</p>
            <p className="text-xs text-gray-400">
              ・{formatTweetTime(updatedAt)}
              {isEdited && <span className="text-xs text-gray-400"> (edited)</span>}
            </p>
          </div>

          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="rouned-full group flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-blue-400 hover:bg-opacity-20"
          >
            <BsThreeDots size={20} className="transition-all group-hover:text-blue-500" />
          </button>
          <div className={clsx("absolute right-2 top-10 z-10 w-28", { hidden: !isPopoverOpen })}>
            <div className="rounded-lg bg-zinc-900 p-2 text-sm">
              {tweetActions.map(({ label, onClick, className }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className={clsx(
                    "w-full rounded-md px-2 py-2 text-left hover:bg-zinc-800",
                    className
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-1">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

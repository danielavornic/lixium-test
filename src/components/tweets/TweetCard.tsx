import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";

import { tweetsApi } from "@/api";
import { useClickOutside } from "@/hooks";
import { Tweet } from "@/types";
import { formatTweetTime } from "@/utils";

import { TweetActionsMenu } from "./TweetActionsMenu";

export const TweetCard = ({ tweet }: { tweet: Tweet }) => {
  const { author, createdAt, updatedAt, content } = tweet;
  const isEdited = createdAt !== updatedAt;

  const router = useRouter();
  const queryClient = useQueryClient();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [menuState, setMenuState] = useState<{ isOpen: boolean; position: "top" | "bottom" }>({
    isOpen: false,
    position: "bottom"
  });

  const hidePopover = () => setMenuState((prev) => ({ ...prev, isOpen: false }));

  const toggleMenu = useCallback(() => {
    if (cardRef.current) {
      const cardBounds = cardRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - cardBounds.bottom;
      const popoverHeight = 90;
      const newPosition = spaceBelow < popoverHeight ? "top" : "bottom";
      setMenuState({ isOpen: !menuState.isOpen, position: newPosition });
    }
  }, [menuState.isOpen]);

  const { mutate: deleteTweet } = useMutation({
    mutationFn: () => tweetsApi.deleteTweet(tweet.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets"] });
      toast.success("Tweet deleted successfully!", {
        position: "top-right"
      });
    },
    onError: () => {
      toast.error("Failed to delete tweet. Please try again later.", {
        position: "top-right"
      });
    }
  });

  const handleEdit = () => {
    hidePopover();
    router.push(`/?editTweet=${tweet.id}`);
  };

  const handleDelete = () => {
    hidePopover();
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

  useClickOutside(cardRef, hidePopover);

  return (
    <div className="relative flex w-full space-x-4 rounded-lg border border-zinc-700 bg-transparent px-2 py-3">
      <div
        className="flex h-10 min-w-10 items-center justify-center space-x-2 rounded-full bg-pink-300 font-semibold"
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

          <div ref={cardRef}>
            <button
              onClick={toggleMenu}
              aria-label="Tweet actions"
              className="rouned-full group flex h-8 min-w-8 items-center justify-center rounded-full transition-all hover:bg-pink-400 hover:bg-opacity-20"
            >
              <BsThreeDots size={20} className="transition-all group-hover:text-pink-500" />
            </button>
            <TweetActionsMenu
              menuState={menuState}
              tweetActions={tweetActions}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>

        <div className="mt-1">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

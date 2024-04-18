import clsx from "clsx";

interface TweetActionsMenuProps {
  menuState: { isOpen: boolean; position: "top" | "bottom" };
  tweetActions: { label: string; onClick: () => void; className?: string }[];
  toggleMenu: () => void;
}

export const TweetActionsMenu = ({
  menuState,
  tweetActions,
  toggleMenu
}: TweetActionsMenuProps) => {
  const { isOpen, position } = menuState;

  return (
    <div
      className={clsx("absolute right-2 z-10 w-28", {
        hidden: !isOpen,
        "top-5": position === "bottom",
        "bottom-10": position === "top"
      })}
    >
      <div className="rounded-lg bg-zinc-900 p-2 text-sm">
        {tweetActions.map(({ label, onClick, className }) => (
          <button
            key={label}
            onClick={() => {
              toggleMenu();
              onClick();
            }}
            className={clsx("w-full rounded-md px-2 py-2 text-left hover:bg-zinc-800", className)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

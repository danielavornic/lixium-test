export const formatTweetTime = (date: string) => {
  const time = new Date(date);

  return time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

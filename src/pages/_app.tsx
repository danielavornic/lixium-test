import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import NextProgress from "next-progress";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextProgress color="#29D" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

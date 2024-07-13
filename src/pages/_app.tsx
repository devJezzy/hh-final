// pages/_app.tsx
import type { AppProps } from "next/app";
import { TripProvider } from "../context/TripContext";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TripProvider>
      <Component {...pageProps} />
    </TripProvider>
  );
}

export default MyApp;

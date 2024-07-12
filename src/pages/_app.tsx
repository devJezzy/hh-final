// pages/_app.tsx
import type { AppProps } from "next/app";
// import { PlanProvider } from "../context/PlanContext";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <PlanProvider>
      <Component {...pageProps} />
    // </PlanProvider>
  );
}

export default MyApp;

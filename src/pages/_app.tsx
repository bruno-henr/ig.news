import { Header } from "@/components/Header";
import type { AppProps } from "next/app";
import "../styles/Global.scss";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  console.log('sessao teste', pageProps.session)

  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

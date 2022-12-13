import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Script from 'next/script';
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "https://natuprime.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossOrigin="anonymous"/>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </>
  );
}
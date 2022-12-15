import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Script from 'next/script';
import "../styles/globals.css";
import { useCheckoutCreateMutation } from "@/saleor/api";

const client = new ApolloClient({
  uri: "https://natuprime.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});

const Root = ({ Component, pageProps}: AppProps)=>{
  const [token,setToken] = useLocalStorage("token");
  const [CheckoutCreate, {data, loading}] = useCheckoutCreateMutation()

  useEffect(()=>{
    async function doCheckout() {
      const {data} = await CheckoutCreate();
      const token = data?.checkoutCreate?.checkout?.token;

      setToken(token)
    }

    doCheckout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <Component {...pageProps} token={token}/>
}

export default function MyApp(props: AppProps) {
  return (
    <>
    <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossOrigin="anonymous"/>
    <ApolloProvider client={client}>
      <Root {...props} />
    </ApolloProvider>
    </>
  );
}
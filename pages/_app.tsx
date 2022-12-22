import type { AppProps } from "next/app";
import React, { useState, createContext } from 'react'
import { useLocalStorage, useEffectOnce } from "react-use";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Script from 'next/script';
import "../styles/globals.css";
import { useCheckoutCreateMutation, useCheckoutFetchByTokenQuery, CheckoutLine} from "@/saleor/api";

const client = new ApolloClient({
  uri: "https://natuprime.saleor.cloud/graphql/",
  cache: new InMemoryCache(),
});

type CheckoutLineType = {
  cartContent: CheckoutLine[] ;
  setCartContent: (value: CheckoutLine[]) => void;
};

const Root = ({ Component, pageProps}: AppProps)=>{
  const [token,setToken] = useLocalStorage("token");
  const [CheckoutCreate, {data, loading}] = useCheckoutCreateMutation()
  async function doCheckout() {
    const {data} = await CheckoutCreate();
    const token = data?.checkoutCreate?.checkout?.token;
    setToken(token)
  }
  useEffectOnce(()=>{
    if(!token){
      doCheckout();
    }
  })

  return <Component {...pageProps} token={token}/>
}

const CartQuery = () =>{
  const [token] = useLocalStorage('token');
  const { data, loading, error } = useCheckoutFetchByTokenQuery({
      variables: { checkoutToken: token },
      skip: !token,
    });
    let cartList = data?.checkout?.lines as CheckoutLine[];
    return cartList
}

export const CartContext = createContext<CheckoutLineType>({
  cartContent: CartQuery(), setCartContent: () =>{}
});

export default function MyApp(props: AppProps) {
  const [cartContent,setCartContent] = useState(CartQuery())
  return (
    <>
    <Script src="https://kit.fontawesome.com/dbb3bd5296.js" crossOrigin="anonymous"/>
    <ApolloProvider client={client}>
    <CartContext.Provider value={{cartContent,setCartContent}}>
      <Root {...props} />
    </CartContext.Provider>
    </ApolloProvider>
    </>
  );
}
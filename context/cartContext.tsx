import React, { useState, createContext } from 'react'
import { useLocalStorage } from 'react-use';
import { useCheckoutFetchByTokenQuery, CheckoutLine } from "@/saleor/api";

type CheckoutLineType = {
    cartContent: CheckoutLine[];
    setCartContent: (newSession: CheckoutLine[]) => void;
};

const CartContext = createContext<CheckoutLineType | null>(null);

export const CartProvider = () => {
    const [token] = useLocalStorage('token');
    const { data, loading, error } = useCheckoutFetchByTokenQuery({
        variables: { checkoutToken: token },
        skip: !token,
      });
      let cartList = data?.checkout?.lines || [];
      const [cartContent,setCartContent] = useState(cartList)

  return <CartContext.Provider value={{cartContent,setCartContent}}/>
}

export default CartContext;

// components/ProductCollection.tsx
import { useProductUpdateVariantInCartMutation, useCheckoutFetchByTokenQuery, CheckoutLine } from "@/saleor/api";
import Image from "next/image";
import {useLocalStorage} from "react-use";
import {useState,useEffect} from 'react';

export default function Navbar() {
  const [token] = useLocalStorage('token');
  const { data, loading, error } = useCheckoutFetchByTokenQuery({variables: { checkoutToken: token },skip: !token});
  let cartList = data?.checkout?.lines || [];
  const [cart,setCart] = useState([]);
  console.log(cart)
  const [updateProductInCart] = useProductUpdateVariantInCartMutation();
  const updateCart = async(item: CheckoutLine) =>{
    let cartIndex = cartList.findIndex((obj => obj.id === item.id));
    let temp = [...cartList]
    let num = {...temp[cartIndex]}
    num = item.quantity+1;
    console.log(temp)
    setCart(temp)
    await updateProductInCart({
      variables:{ checkoutToken: token, lineId: item.id, quantity: item.quantity+1}
    });
  }
  useEffect(()=>{
    setCart(cartList)
  },[data])
 return(
  <div className="navbar bg-white p-0">
  <div className="flex-1 px-10">
    <Image src="/images/logo2.svg" width={150} height={150} alt=""/>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
      <li className='p-3'><a className='font-medium text-black'>主頁</a></li>
      <li tabIndex={0} className='p-3'>
        <a className='font-medium text-black'>
          立即購買
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
        </a>
        <ul className="p-2 bg-base-100">
          <li><a>我們</a></li>
          <li><a>立即購買</a></li>
        </ul>
      </li>
      <li className='p-3'><a className='font-medium text-black'>關於我們</a></li>
    </ul>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-80 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">{cartList.length} Items</span>
          {cart.map((items)=>
            <div key={items?.variant?.product?.id} className="flex items-center h-16">
              <div className="relative w-1/4 h-16">
                <Image src={items?.variant?.product?.thumbnail!.url} fill alt=""/>
              </div>
              <div className="p-7 w-2/4">
                {items?.variant?.product?.name}
              </div>
              <button onClick={() => updateCart(items as CheckoutLine)} className="btn btn-circle btn-outline border-box w-8 h-8 min-h-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M0 12L24 12" /></svg>
              </button>
              <div className="w-10 text-center">
              {items?.quantity}
              </div>
              <button onClick={() => updateCart(items as CheckoutLine)} className="btn btn-circle btn-outline border-box w-8 h-8 min-h-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M0 12L24 12M12 0L12 24" /></svg>
              </button>
            </div>
          )}
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    )
};

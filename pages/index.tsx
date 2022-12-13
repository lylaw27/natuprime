// components/ProductCollection.tsx
import React from "react";
import {Product, useProductGetListQuery } from "@/saleor/api";
import Navbar from "@/components/navbar";
import ProductList from "@/components/productList";

export default function Home() {
  const { loading, error, data } = useProductGetListQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (data) {
    const productList = data.products?.edges || [];
    return (
      <>
      <Navbar/>
      <div className="flex">
        {productList.map( node => (
          <ProductList key={node.node.id} {...node.node}/>
          )
          )}
      </div>
     <div>

     </div>
      </>
    );
  }

  return null;
};
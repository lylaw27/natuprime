// components/ProductCollection.tsx
import React from "react";
import Image from "next/image";
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
          <div className="carousel w-full h-screen">
      <div id="slide1" className="carousel-item relative w-full">
        <Image fill alt="" src="/images/carousel.jpg" className="w-full"/>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      </div>
      <div className="flex">
          {productList?.length > 0 &&
          productList.map(({ node }) => (
            <ProductList key={node.id} {...(node as Product)} />
          ))}
      </div>
     <div>

     </div>
      </>
    );
  }

  return null;
};
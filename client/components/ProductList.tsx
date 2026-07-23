"use client";

import Image from "next/image";
import Loading from "./Loading";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import { useProductFilter } from "../context/ProductFilterContext";
import { filterProduct } from "../utils/productUtils";
import { useRouter } from "next/navigation";
import { useFetch } from "context/FetchContext";
import { fetchFailure, fetchStart, fetchSuccess } from "context/FetchAction";

export default function ProductList({ newArrival }: any) {
  const router = useRouter();
  const { data, isFetching, dispatch } = useFetch();
  const { type, rangePrice, color, sortBy } = useProductFilter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    const fetchProductList = async (newArrival: boolean) => {
      dispatch(fetchStart());
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/product/list`);
        const productData: Product[] = await response.json();
        const productList = await filterProduct(newArrival, type, rangePrice, color, sortBy, productData);
        dispatch(fetchSuccess(productList));
      } catch (error: any) {
        dispatch(fetchFailure());
        console.error(error.message);
      }
    };
    fetchProductList(newArrival);
  }, [type, rangePrice, color, sortBy, newArrival]);

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-2 sms:grid-cols-1 gap-4 h-full w-full">
      {isFetching && (
        <>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
          <div className="col-span-1 w-full h-full">
            <Loading />
          </div>
        </>
      )}

      {!isFetching && products?.length < 1 && (
        <div className="flexCenter col-span-full">
          <Image
            src="https://study91.co.in/Scripts/assets/images/prasad_img/no-product-found.png"
            alt="Product Not Found"
            className="object-cover object-center"
            loading="lazy"
            width={600}
            height={600}
          />
        </div>
      )}

      {products?.length > 0 &&
        products?.map((product: Product) => (
          <div
            key={product?._id}
            className="relative group cursor-pointer lg:pb-8 sms:pb-12"
            onClick={() => router.push(`/product/${product?._id}`)}
          >
            <div className="relative">
              <Image
                src={product?.image[0] && Object.values(product?.image[0])[0]}
                blurDataURL={product?.image[0] && Object.values(product?.image[0])[0]}
                className="object-cover object-center w-full h-full drop-shadow-md"
                alt={product?.name || "clothes.png"}
                loading="lazy"
                width={231.52}
                height={231.52}
              />

              {product?.newArrival && (
                <div className="absolute top-0 left-0 lg:py-0.5 lg:px-3 sms:py-1 sms:px-5 bg-primary text-white lg:text-sm sms:text-base">
                  New Arrival
                </div>
              )}

              {product?.bestSeller && (
                <div className="absolute top-0 left-0 lg:py-0.5 lg:px-3 sms:py-1 sms:px-5 bg-primary text-white lg:text-sm sms:text-base">
                  Best Seller
                </div>
              )}

              <div className="flexCenter transition-quick absolute bottom-0 left-0 w-full h-0 bg-white text-transparent text-sm transition-all duration-300 ease-out">
                Quick View
              </div>
            </div>

            <div className="flex flex-col lg:gap-0 sms:gap-3 mt-6 text-center">
              <h3 className="text-primary lg:text-base sms:text-2xl">{product?.name}</h3>
              <span className="lg:text-sm sms:text-lg">{product?.price}</span>
            </div>
          </div>
        ))}
    </section>
  );
}

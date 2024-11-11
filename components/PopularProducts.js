import ProductCard from "@/common/ProductCard";
import { useGetProductsQuery } from "@/features/products/productApi";
import CommonLayout from "@/layouts/commonLayout";
import Link from "next/link";
import React from "react";
import ProductLoading from "./loaders/ProductLoading";

const PopularProducts = () => {
  const productQuery = {
    search: "",
    skip: 0,
    sort: 1,
    searchByCategory: "",
    limit: 12,
  };

  const { data: products, isLoading: productLoading } =
    useGetProductsQuery(productQuery);

  return (
    <section className="p-3">
      {productLoading ? (
        <ProductLoading />
      ) : (
        <CommonLayout>
          <div className="flex flex-col lg:justify-between lg:flex-row items-center">
            <div className="leading-none w-full">
              <h3 className="text-4xl font-bold border-l-4 border-red-600 px-2">
                Popular Products
              </h3>
            </div>

            <div className="mt-3 font-semibold w-full flex justify-between items-center">
              <button className="w-full text-center border-b-2 text-red-600 border-red-600 p-2">
                Top Rated
              </button>
              <button className="w-full text-center p-2">Best Selling</button>
              <button className="w-full text-center p-2">Latest Product</button>
            </div>
          </div>

          <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products?.data?.data?.map((product) => (
              <ProductCard key={product?._id} info={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href={"/shop"}>
              <button className="bg-red-600 px-6 py-2 rounded-md text-white  text-2xl">
                See All
              </button>
            </Link>
          </div>
        </CommonLayout>
      )}
    </section>
  );
};

export default PopularProducts;

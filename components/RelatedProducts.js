import { useGetProductsQuery } from "@/features/products/productApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";

const RelatedProducts = ({ category }) => {
  const [searchCategory, setSearchCateory] = useState("");
  const productQuery = {
    search: "",
    skip: 0,
    sort: 1,
    searchByCategory: searchCategory,
    limit: 6,
  };

  const { data } = useGetProductsQuery(productQuery);

  useEffect(() => {
    setSearchCateory(category);
  }, [category]);

  console.log(data);

  console.log(searchCategory);

  return (
    <div>
      {data?.data?.data?.length && (
        <div className="my-6 lg:my-16">
          <p className="text-2xl font-bold border-l-4 border-red-600 pl-2">
            Related Products
          </p>

          <div className="mt-4">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              {data?.data?.data?.map((product) => {
                const { _id, images, discount } = product || {};
                return (
                  <div className=" rounded-md shadow-md">
                    <div className="relative overflow-hidden">
                      <Link href={`${_id}`}>
                        <div className="">
                          <img
                            src={images[0]?.url}
                            alt=""
                            className={`object-cover h-[] object-center w-full rounded-t-md dark:bg-gray-500`}
                          />
                        </div>
                      </Link>
                      <div className="absolute top-3 left-0">
                        <p className="px-3 py-1.5 mt-3 bg-red-600 text-white">
                          Sale
                        </p>
                        <p className="px-3 py-1.5 mt-2 bg-black text-white">
                          -{discount}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;

import ProductCard from "@/common/ProductCard";
import Subscribe from "@/common/Subscribe";
import OfferBanar from "@/components/OfferBanar";
import ShopLoader from "@/components/loaders/ShopLoader";
import { useGetCategorysQuery } from "@/features/category/categoryApi";
import { useGetProductsQuery } from "@/features/products/productApi";
import CommonLayout from "@/layouts/commonLayout";
import CustomerLayout from "@/layouts/customerLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [showPage, setShowPage] = useState(1);
  const [sort, setSort] = useState(1);

  const route = useRouter();

  const { search, searchCategory } = route.query;

  const query = { search: "", skip: 0 };
  const { data: categories } = useGetCategorysQuery(query);

  const productQuery = {
    search: searchProducts,
    skip: showPage === 1 ? 0 : (showPage - 1) * 10,
    sort,
    searchByCategory: activeCategory,
    limit: 12,
  };

  const {
    data: products,
    isLoading: productLoading,
    isError: isProductError,
  } = useGetProductsQuery(productQuery);

  useEffect(() => {
    setSearchProducts(search);

    if (searchCategory) {
      setActiveCategory(searchCategory);
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>HarriShop | All Product</title>
      </Head>
      <main>
        {productLoading ? (
          <ShopLoader />
        ) : (
          <div>
            {isProductError ? (
              <div>
                {" "}
                <p className="w-full text-2xl text-red-600">
                  Something went Wrong!
                </p>
              </div>
            ) : (
              <section className="">
                <CommonLayout>
                  <div className="mt-14 lg:mt-0">
                    <OfferBanar />
                  </div>

                  <div className="lg:p-0 p-3">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="hidden lg:block ">
                        <div className="my-6 border p-3">
                          <p className="p-3 border-b text-2xl font-semibold">
                            Product Category
                          </p>

                          <div className="my-2">
                            <button
                              onClick={() => setActiveCategory("")}
                              className={`p-3  m-1 text font-semibold rounded-md border-b w-full text-left  ${
                                activeCategory === "" && "bg-gray-100 "
                              }`}
                            >
                              All Category
                            </button>

                            {categories?.data?.data?.map((category) => {
                              const { _id, name, icon } = category || {};
                              return (
                                <button
                                  onClick={() => setActiveCategory(_id)}
                                  key={_id}
                                  className={`p-1 capitalize m-1 font-semibold w-full rounded-md flex  items-center border-b ${
                                    activeCategory === _id && "bg-gray-100"
                                  }`}
                                >
                                  <img
                                    className="h-10 p-1 w-10 mx-2 rounded-lg"
                                    src={icon[0]?.url}
                                    alt="icon"
                                  />
                                  {name}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="my-6 border p-3">
                          <p className="p-3 border-b text-2xl text-center font-semibold">
                            Price Filter
                          </p>

                          <div className="my-2 w-full">
                            <select
                              onChange={(e) => setSort(e.target.value)}
                              className="py-3 px-6 w-full bg-white border"
                            >
                              <option value="low">Price low to high</option>
                              <option value="high">Price high to Low </option>
                            </select>
                          </div>
                        </div>

                        <div className="my-6 border p-3 w-full h-[300px] shadow-md">
                          <p className="p-3 border-b text-2xl text-center font-semibold">
                            NEWSLETTER
                          </p>

                          <div className="my-2 w-full h-full flex justify-center ">
                            <div>
                              <p className="text-center p-1">
                                Sign Up for Our Newsletter:
                              </p>
                              <input
                                type="text"
                                placeholder="Email"
                                className="px-1 py-3 w-full border"
                              />

                              <button className="p-3 w-full bg-red-600 font-semibold  text-white my-1">
                                Subscribe
                              </button>

                              <div className="my-3 flex justify-center items-center">
                                <button className="m-1">
                                  {" "}
                                  <FaFacebookF
                                    size={30}
                                    className="bg-blue-600 text-white p-2 rounded-full"
                                  />
                                </button>
                                <button className="m-1">
                                  {" "}
                                  <FaInstagram
                                    size={30}
                                    className="bg-red-600 text-white p-2 rounded-full"
                                  />
                                </button>
                                <button className="m-1">
                                  {" "}
                                  <BsTwitter
                                    size={30}
                                    className="bg-blue-400 text-white p-2 rounded-full"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-span-4 lg:col-span-3  ">
                        <div className="my-6 border p-3 flex flex-col lg:flex-row justify-between items-center">
                          <p className="p-3">
                            Showing {showPage <= 1 ? 1 : (showPage - 1) * 12} -
                            {showPage <= 1
                              ? products?.data.count >= 12
                                ? 10
                                : products?.data.count
                              : showPage * 12 > products?.data?.count
                              ? products?.data?.count
                              : showPage * 12}{" "}
                            of {products?.data?.count}
                          </p>
                        </div>

                        {products?.data?.data?.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {products?.data?.data.map((product) => {
                              return (
                                <ProductCard
                                  key={product?._id}
                                  info={product}
                                />
                              );
                            })}
                          </div>
                        ) : (
                          <div className="w-full text-center text-2xl text-red-400">
                            No Product Found
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" my-10">
                      <div className="p-4  flex w-full justify-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => setShowPage(showPage - 1)}
                            disabled={showPage === 1}
                            className="p-2 hover:bg-gray-200 duration-300  flex items-center border mx-1"
                          >
                            <span>
                              <AiOutlineLeft />
                            </span>
                            <span>Prev </span>
                          </button>

                          <button
                            className={`p-2 ${
                              showPage === 1
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-black"
                            }  duration-300 rounded-md mx-1 hover:bg-red-600/40 hover:text-white`}
                            onClick={() =>
                              setShowPage(showPage === 1 ? 1 : showPage - 1)
                            }
                          >
                            {showPage === 1 ? 1 : showPage - 1}
                          </button>

                          {showPage > 1 && (
                            <button
                              onClick={() => setShowPage(showPage + 1)}
                              className={`p-2 ${
                                showPage > 1
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-200 text-black"
                              }  duration-300 rounded-md mx-1 hover:bg-red-600 hover:text-white`}
                            >
                              {showPage === 1 ? 2 : showPage}
                            </button>
                          )}

                          {showPage > 2 && (
                            <button
                              className={`p-2 bg-gray-200 text-black duration-300 rounded-md mx-1 hover:bg-red-600/40 hover:text-white`}
                              onClick={() =>
                                setShowPage(showPage === 1 ? 3 : showPage + 1)
                              }
                              disabled={
                                showPage ===
                                Math.ceil(products?.data?.count / 10)
                              }
                            >
                              {showPage === 1 ? 3 : showPage + 1}
                            </button>
                          )}

                          <span>-</span>

                          <button
                            onClick={() => setShowPage(showPage + 1)}
                            className="p-2 hover:bg-gray-200 duration-300 rounded-md mx-1"
                          >
                            {Math.ceil(products?.data?.count / 10)}
                          </button>

                          <button
                            className="p-2 hover:bg-gray-200 duration-300  flex items-center border mx-1"
                            disabled={
                              showPage === Math.ceil(products?.data?.count / 10)
                            }
                            onClick={() => setShowPage(showPage + 1)}
                          >
                            <span>Next</span>
                            <span>
                              <AiOutlineRight />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CommonLayout>
                <Subscribe />
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
};

Shop.getLayout = (page) => {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default Shop;

import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import ProductsTable from "@/components/admin/Products/ProductsTable";
import CommonLayout from "@/layouts/commonLayout";
import { useGetCategorysQuery } from "@/features/category/categoryApi";
import Link from "next/link";
import { useGetProductsQuery } from "@/features/products/productApi";
import Head from "next/head";

const Products = () => {
  const [searchProducts, setSearchProducts] = useState("");
  const [showPage, setShowPage] = useState(1);
  const [sort, setSort] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");

  const { data: categories } = useGetCategorysQuery({ search: "", skip: 0 });

  const query = {
    search: searchProducts,
    skip: showPage === 1 ? 0 : (showPage - 1) * 10,
    sort,
    searchByCategory,
    limit: 10,
  };

  const {
    data: products,
    isLoading: productLoading,
    isError: isProductError,
    error: productError,
  } = useGetProductsQuery(query);

  return (
    <>
      <Head>
        <title>Admin | Products</title>
      </Head>
      <main>
        <section className="  bg-gray-100 min-h-screen">
          <CommonLayout>
            <div className="">
              <h3 className="lg:py-4 text-xl font-semibold p-2 ">Products</h3>

              {/* products search section  */}
              <div className="my-3 grid grid-cols-1 lg:grid-cols-4 py-6 px-4 gap-6 rounded-md shadow-sm bg-white">
                <input
                  onChange={(e) => setSearchProducts(e.target.value)}
                  className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                  type="text"
                  placeholder={"search by product name"}
                />

                <div>
                  <select
                    onChange={(e) => setSearchByCategory(e.target.value)}
                    name="category"
                    id=""
                    className="w-full p-3 rounded-md border bg-gray-100 active:bg-white capitalize"
                  >
                    <option value={""}>All Category</option>

                    {categories?.data?.data?.map((item, i) => (
                      <option className="" key={i} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full p-3 rounded-md border bg-gray-100 active:bg-white"
                  >
                    <option value={"high"}>High to Low</option>
                    <option value={"low"}>Low to High</option>
                  </select>
                </div>
                <div>
                  <Link href={"/admin/addNewProduct"}>
                    <button className="w-full h-full p-3 lg:p-0 bg-red-600/50 rounded-md text-white hover:bg-red-600 duration-300">
                      + Add Product
                    </button>
                  </Link>
                </div>
              </div>

              {/* products table  */}

              {productLoading ? (
                <div className="text-center text-xl font-bold">Loading...</div>
              ) : isProductError ? (
                <div className="text-center text-xl font-bold text-red-600">
                  {productError.data?.message}
                </div>
              ) : products.data?.data?.length > 0 ? (
                <ProductsTable
                  products={products?.data}
                  showPage={showPage}
                  setShowPage={setShowPage}
                />
              ) : (
                <div className="text-center text-xl font-bold">
                  No Product Found!
                </div>
              )}
            </div>
          </CommonLayout>
        </section>
      </main>
    </>
  );
};

Products.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Products;

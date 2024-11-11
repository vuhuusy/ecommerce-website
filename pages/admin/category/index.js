import AddNewCategory from "@/components/admin/Category/AddNewCategory";
import CategoryTable from "@/components/admin/Category/CategoryTable";
import { useGetCategorysQuery } from "@/features/category/categoryApi";
import AdminLayout from "@/layouts/AdminLayout";
import CommonLayout from "@/layouts/commonLayout";
import AdminRoute from "@/routes/AdminRoute";
import PrivateRouteHOC from "@/routes/PrivateRoute";
import { Drawer } from "antd";
import Head from "next/head";
import { useState } from "react";

const Category = () => {
  const [categoryDrawer, setCategoryDeawer] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [showPage, setShowPage] = useState(1);

  const query = {
    search: searchCategory,
    skip: showPage === 1 ? 0 : (showPage - 1) * 10,
  };

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategorysQuery(query);

  return (
    <>
      <Head>
        <title>Admin | Categories</title>
      </Head>
      <main>
        <section className=" bg-gray-100 min-h-screen">
          <CommonLayout>
            <div className="">
              <h3 className="lg:py-4 text-xl font-semibold p-2 ">Category</h3>

              {/* products search section  */}
              <div className="my-3 grid grid-cols-1 lg:grid-cols-5  py-6 px-4 gap-6 rounded-md shadow-sm bg-white w-full">
                <div className="lg:col-span-4 col-span-2">
                  <input
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="text"
                    onChange={(e) => setSearchCategory(e.target.value)}
                    placeholder="search by category name"
                  />
                </div>

                <div className="w-full bg-red-200">
                  <button
                    onClick={() => setCategoryDeawer(true)}
                    className="w-full h-full p-3 lg:p-0 bg-red-600/40 rounded-md text-white hover:bg-red-600 duration-300"
                  >
                    + Add Category
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center text-xl font-bold">Loading...</div>
              ) : isError ? (
                <div className="text-center text-xl font-bold text-red-600">
                  {error.data?.message}
                </div>
              ) : categories?.data?.data.length > 0 ? (
                <CategoryTable
                  categories={categories?.data}
                  showPage={showPage}
                  setShowPage={setShowPage}
                />
              ) : (
                <div className="text-center text-xl font-bold">
                  No Categories Found!
                </div>
              )}
            </div>
          </CommonLayout>

          <Drawer
            title={"Add Category"}
            placement="right"
            onClose={() => setCategoryDeawer(false)}
            open={categoryDrawer}
          >
            <AddNewCategory data={{}} setCategoryDeawer={setCategoryDeawer} />
          </Drawer>
        </section>
      </main>
    </>
  );
};

Category.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminRoute(Category);

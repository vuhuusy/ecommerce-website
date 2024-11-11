import AddNewCategory from "@/components/admin/Category/AddNewCategory";
import CategoryTable from "@/components/admin/Category/CategoryTable";
import UserTable from "@/components/admin/user/UserTable";
import { useGetCategorysQuery } from "@/features/category/categoryApi";
import { useGetAllUserQuery } from "@/features/user/userApi";
import AdminLayout from "@/layouts/AdminLayout";
import CommonLayout from "@/layouts/commonLayout";
import AdminRoute from "@/routes/AdminRoute";
import Head from "next/head";
import { useState } from "react";

const Customers = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [showPage, setShowPage] = useState(1);

  const { data: customers } = useGetAllUserQuery();

  console.log(customers);

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
        <title>Admin | Customers</title>
      </Head>
      <main>
        <section className=" bg-gray-100 min-h-screen">
          <CommonLayout>
            <div className="">
              <h3 className="lg:py-4 text-xl font-semibold p-2 ">Customers</h3>

              {/* products search section  */}
              <div className="my-3 rounded-md shadow-sm bg-white w-full">
                <input
                  className="w-full p-3 focus:outline-none rounded-md border "
                  type="text"
                  onChange={(e) => setSearchCategory(e.target.value)}
                  placeholder="search by category name"
                />
              </div>

              {isLoading ? (
                <div className="text-center text-xl font-bold">Loading...</div>
              ) : isError ? (
                <div className="text-center text-xl font-bold text-red-600">
                  {error.data?.message}
                </div>
              ) : categories?.data?.data.length > 0 ? (
                <UserTable
                  customers={customers}
                  categories={categories}
                  showPage={showPage}
                  setShowPage={setShowPage}
                />
              ) : (
                <div className="text-center text-xl font-bold">
                  No User Found!
                </div>
              )}
            </div>
          </CommonLayout>
        </section>
      </main>
    </>
  );
};

Customers.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminRoute(Customers);

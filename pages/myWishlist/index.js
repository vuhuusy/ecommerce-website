import {
  useAddToWishListMutation,
  useGetUserWishListProductsQuery,
} from "@/features/wishList/wishListApi";
import CommonLayout from "@/layouts/commonLayout";
import CustomerLayout from "@/layouts/customerLayout";
import PrivateRouteHOC from "@/routes/PrivateRoute";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import swal from "sweetalert";

const MyWishlist = () => {
  const { data, isLoading, isError, error } = useGetUserWishListProductsQuery();

  const [
    addToWishList,
    { isLoading: deleteLoading, isSuccess: deleteSuccess },
  ] = useAddToWishListMutation();

  console.log(data);

  const handelRemoveWishList = (product) => {
    swal({
      title: "Are you sure?",
      text: "Remove this product on Wish list?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        addToWishList(product);
      } else {
        swal("Your Wist List Product is safe!");
      }
    });
  };

  useEffect(() => {
    if (deleteLoading) {
      swal("Please Wait...", {
        icon: "info",
        buttons: false,
      });
    }

    if (deleteSuccess) {
      swal("Wist List Product Remove Successfully!", {
        icon: "success",
      });
    }
  }, [deleteLoading, deleteSuccess]);

  return (
    <>
      <Head>
        <title>User | Wishlist</title>
      </Head>
      <main>
        <section className="mt-12 lg:mt-0">
          <div
            className=" shadow-md  lg:h-[300px] flex justify-center items-center"
            style={{
              backgroundImage: `url(https://hamart-shop.vercel.app/_next/static/media/cta-bg-1.3e8b3216.jpg)`,
              height: "100%",
              backgroundSize: "cover",
            }}
          >
            <p className="p-12 text-2xl lg:text-4xl text-center font-bold ">
              My Wishlist
            </p>
          </div>

          <CommonLayout>
            <div className="bg-[#F0F2EE] mt-10">
              <Link href={"/shop"}>
                <p className="p-5">Continue Shopping</p>
              </Link>
            </div>

            <div className="my-6 p-3 lg:p-0 text-xs lg:text-normal">
              <div className="mx-auto ">
                <div className="overflow-x-auto">
                  {isLoading ? (
                    <div className="text-2xl font-semibold text-center p-3">
                      <p> Loading...</p>
                    </div>
                  ) : isError ? (
                    <div className="text-2xl font-semibold text-center p-3">
                      <p>{error?.data?.message}</p>
                    </div>
                  ) : data?.data?.length > 0 ? (
                    <table className="min-w-full ">
                      <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead className="border">
                        <tr className="text-center">
                          <th className="p-3 border">SL</th>
                          <th className="p-3 border">Image</th>
                          <th className="p-3 border">Title</th>
                          <th className="p-3 border">Unit</th>
                          <th className="p-3 border ">Price</th>
                          <th className="p-3 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.map((wishList, i) => {
                          const { _id, images, price, title, unit, productId } =
                            wishList;
                          return (
                            <tr key={_id} className="border border-opacity-20 ">
                              <th className="p-3 border-r">
                                <div className="w-full h-full flex justify-center items-center">
                                  <p>{i + 1}</p>
                                </div>
                              </th>

                              <td className="p-3 border-r">
                                <div className="w-full h-full flex justify-center items-center">
                                  <img
                                    className="w-14 h-14 rounded-full"
                                    src={images}
                                    alt={title}
                                  />
                                </div>
                              </td>
                              <td className="p-3 border-r">
                                <div className="w-full h-full capitalize">
                                  <Link href={`/${productId}`}>
                                    <p className="text-xl font-semibold hover:text-red-600">
                                      {title}
                                    </p>
                                  </Link>
                                </div>
                              </td>
                              <td className="p-3 border-r ">
                                <div className="w-full h-full flex justify-center items-center">
                                  <p className="text-xl font-semibold hover:text-red-600 uppercase">
                                    {unit}
                                  </p>
                                </div>
                              </td>

                              <td className="p-3 border-r ">
                                <div className="w-full h-full flex justify-center items-center">
                                  {/* <div className="flex items-center content-center my-auto  py-0 rounded-md border border-gray-100 font-semibold">
                              <div className="m-0">
                                <button
                                  disabled={count < 2 ? true : false}
                                  onClick={() => setCount(count - 1)}
                                  className=" px-3 py-1 my-0 mx-auto text-lg "
                                >
                                  −
                                </button>
                              </div>
                              <div className="m-0">
                                <p className=" px-3 py-1 my-0 mx-auto ">
                                  {count}
                                </p>
                              </div>
                              <div className="m-0">
                                <button
                                  onClick={() => setCount(count + 1)}
                                  className=" px-3 py-1 my-0 mx-auto text-lg "
                                >
                                  +
                                </button>
                              </div>
                            </div> */}
                                  <p className="text-xl font-semibold hover:text-red-600">
                                    ${price}
                                  </p>
                                </div>
                              </td>

                              <td className="p-3 border-r ">
                                <div className="w-full h-full flex justify-center items-center">
                                  <button
                                    onClick={() =>
                                      handelRemoveWishList(wishList)
                                    }
                                    className="text-red-600"
                                  >
                                    <BiTrash size={30} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-2xl font-semibold text-center p-3">
                      <p>No Wish List Product Found!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="my-4 p-3 lg:p-0">
              <Link href={"/myCart"}>
                <button className=" p-4 bg-black text-white font-semibold">
                  Go to Cart
                </button>
              </Link>
            </div>
          </CommonLayout>
        </section>
      </main>
    </>
  );
};

MyWishlist.getLayout = (page) => {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default PrivateRouteHOC(MyWishlist);

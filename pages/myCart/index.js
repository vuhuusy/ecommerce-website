import {
  useAddToCartListMutation,
  useGetUserCartListProductsQuery,
  useUpdateCartProductQuantatyMutation,
} from "@/features/cartList/cartListApi";
import CommonLayout from "@/layouts/commonLayout";
import CustomerLayout from "@/layouts/customerLayout";
import PrivateRouteHOC from "@/routes/PrivateRoute";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import swal from "sweetalert";

const MyCart = () => {
  const { data, isLoading, isError, error } = useGetUserCartListProductsQuery();

  const [
    addToCartList,
    { isLoading: deleteLoading, isSuccess: deleteSuccess },
  ] = useAddToCartListMutation();

  const [updateCartProductQuantaty, { isLoading: updateLoading }] =
    useUpdateCartProductQuantatyMutation();

  const handelRemoveCartList = (product) => {
    swal({
      title: "Are you sure?",
      text: "Remove this product on Cart list?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        addToCartList(product);
      } else {
        swal("Your Cart List Product is safe!");
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
      swal("Cart List Product Remove Successfully!", {
        icon: "success",
      });
    }
  }, [deleteLoading, deleteSuccess]);

  const incQuentaty = (product) => {
    updateCartProductQuantaty({ ...product, quantity: product.quantity + 1 });
  };

  const decQuentaty = (product) => {
    updateCartProductQuantaty({ ...product, quantity: product.quantity - 1 });
  };

  return (
    <>
      <Head>
        <title>User | Cart</title>
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
              My Cart
            </p>
          </div>

          <CommonLayout>
            <div className="bg-[#F0F2EE] mt-10">
              <Link href={"/shop"}>
                <p className="p-5">Continue Shopping</p>
              </Link>
            </div>

            <div className="my-6 text-xs lg:text-normal p-3 lg:p-0">
              <div className="mx-auto sm:p-4 ">
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
                          <th className="p-3 border">Unit Price</th>
                          <th className="p-3 border">Discount</th>
                          <th className="p-3 border">Quantity</th>
                          <th className="p-3 border ">Price</th>
                          <th className="p-3 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.data?.map((cartList, i) => {
                          const {
                            _id,
                            images,
                            price,
                            title,
                            quantity,
                            productId,
                            discount,
                          } = cartList;
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
                                <div className="w-full h-full flex  items-center capitalize">
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
                                    ${price}
                                  </p>
                                </div>
                              </td>
                              <td className="p-3 border-r ">
                                <div className="w-full h-full flex justify-center items-center">
                                  <p className="text-xl font-semibold hover:text-red-600 uppercase">
                                    -{discount}%
                                  </p>
                                </div>
                              </td>

                              <td className="p-3 border-r ">
                                <div className="flex justify-center items-start w-full">
                                  <div
                                    className={`flex items-center content-center my-auto  py-0 rounded-md border border-gray-100 font-semibold ${
                                      updateLoading && "bg-gray-200"
                                    }`}
                                  >
                                    <div className="m-0">
                                      <button
                                        disabled={quantity === 1}
                                        onClick={() => decQuentaty(cartList)}
                                        className=" px-3 py-1 my-0 mx-auto text-lg "
                                      >
                                        −
                                      </button>
                                    </div>
                                    <div className="m-0">
                                      <p className=" px-3 py-1 my-0 mx-auto ">
                                        {quantity}
                                      </p>
                                    </div>
                                    <div className="m-0">
                                      <button
                                        onClick={() => incQuentaty(cartList)}
                                        className=" px-3 py-1 my-0 mx-auto text-lg "
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3 border-r ">
                                <div className="w-full h-full flex justify-center items-center">
                                  <p className="text-xl font-semibold hover:text-red-600">
                                    {(price - (price * discount) / 100) *
                                      quantity}
                                  </p>
                                </div>
                              </td>

                              <td className="p-3 border-r ">
                                <div className="w-full h-full flex justify-center items-center">
                                  <button
                                    onClick={() =>
                                      handelRemoveCartList(cartList)
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

            {data?.data?.length > 0 && (
              <div className="w-full flex lg:justify-end items-center p-3 lg:p-0">
                <div className="lg:w-[400px] w-full">
                  <p className="text-2xl font-semibold ">Cart Totals</p>

                  <div className="my-4">
                    <div className="w-full h-full flex justify-between items-center p-4 bg-gray-100 border">
                      <p>Subtotal</p>
                      <p>
                        $
                        {data?.data?.reduce(
                          (acc, product) =>
                            acc +
                            (product.price -
                              (product.price * product.discount) / 100) *
                              product.quantity,
                          0
                        )}
                      </p>
                    </div>
                    <div className="w-full h-full flex justify-between items-center p-4 bg-gray-100 border font-semibold">
                      <p>Total</p>
                      <p>
                        $
                        {data?.data?.reduce(
                          (acc, product) =>
                            acc +
                            (product.price -
                              (product.price * product.discount) / 100) *
                              product.quantity,
                          0
                        )}
                      </p>
                    </div>

                    <div className="my-4">
                      <Link href={"/checkout"}>
                        <button className=" p-4 w-full bg-red-600 text-white font-semibold">
                          Proceed to checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CommonLayout>
        </section>
      </main>
    </>
  );
};

MyCart.getLayout = (page) => {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default PrivateRouteHOC(MyCart);

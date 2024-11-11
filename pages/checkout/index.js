import React, { useEffect, useState } from "react";
import Head from "next/head";
import OrderSummary from "@/components/OrderSummary";
import CommonLayout from "@/layouts/commonLayout";
import CustomerLayout from "@/layouts/customerLayout";
import { useSelector } from "react-redux";
import PrivateRouteHOC from "@/routes/PrivateRoute";
import { useRouter } from "next/router";
import {
  useAddNewCheckoutMutation,
  useGetCheckoutProductsQuery,
} from "@/features/checkout/checkoutApi";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const { user } = useSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState(user);
  const [productInfo, setProductInfo] = useState({});

  const router = useRouter();
  const { id } = router.query;

  const productId = id ? id : "allCart";

  const { data: checkoutProducts } = useGetCheckoutProductsQuery(productId);

  const [
    addNewCheckout,
    {
      data: checkoutData,
      isLoading: checkoutLoading,
      isError: isCheckoutError,
      error: checkoutError,
    },
  ] = useAddNewCheckoutMutation();

  const handelCheckout = (e) => {
    e.preventDefault();

    // console.log({ productInfo, userInfo, productId });
    //
    addNewCheckout({ productInfo, userInfo, productId });
  };

  useEffect(() => {
    // console.log(checkoutData);
    if (checkoutData?.data) {
      window.location.replace(checkoutData.data);
    } else {
      toast.error("SSLCOMMEREZ Not Working in Production Environment");
    }
  }, [checkoutData]);

  useEffect(() => {
    // console.log(checkoutData);
    if (isCheckoutError) {
      toast.error(checkoutError?.data.message);
    } else {
    }
  }, [isCheckoutError, checkoutError]);

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <main>
        <section className="my-16 ">
          <CommonLayout>
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-2">
                <div className="p-2">
                  <OrderSummary
                    products={checkoutProducts?.data}
                    setProductInfo={setProductInfo}
                  />
                </div>
                <div className="p-2">
                  <form
                    onSubmit={handelCheckout}
                    className="container flex flex-col mx-auto space-y-12 "
                  >
                    <fieldset className="grid grid-cols-3 gap-6 p-6 rounded-md shadow-sm bg-gray-200 capitalize">
                      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                          <label htmlFor="firstname" className="text-sm">
                            First name
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                firstName: e.target.value,
                              })
                            }
                            value={userInfo?.firstName}
                            type="text"
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                          <label htmlFor="lastname" className="text-sm">
                            Last name
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                lastName: e.target.value,
                              })
                            }
                            value={userInfo?.lastName}
                            type="text"
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                          <label htmlFor="email" className="text-sm">
                            Phone Number
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                phone: e.target.value,
                              })
                            }
                            value={userInfo?.phone}
                            type="text"
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                          <label htmlFor="email" className="text-sm">
                            Email
                          </label>
                          <input
                            defaultValue={user?.email}
                            readOnly
                            type="email"
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full">
                          <label htmlFor="address" className="text-sm">
                            Address
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                address: e.target.value,
                              })
                            }
                            value={userInfo?.address}
                            type="text"
                            placeholder=""
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                          <label htmlFor="city" className="text-sm">
                            City
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({ ...userInfo, city: e.target.value })
                            }
                            value={userInfo?.city}
                            type="text"
                            placeholder=""
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                          <label htmlFor="state" className="text-sm">
                            State / Province
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                state: e.target.value,
                              })
                            }
                            value={userInfo?.state}
                            type="text"
                            placeholder=""
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                        <div className="col-span-full sm:col-span-2">
                          <label htmlFor="zip" className="text-sm">
                            ZIP / Postal
                          </label>
                          <input
                            onChange={(e) =>
                              setUserInfo({ ...userInfo, zip: e.target.value })
                            }
                            value={userInfo?.zip}
                            type="text"
                            placeholder=""
                            className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                          />
                        </div>
                      </div>
                    </fieldset>
                    <button className="w-full p-2 bg-red-500 hover:bg-red-600 text-white rounded-md">
                      {checkoutLoading ? "Loading..." : "Checkout"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </CommonLayout>
        </section>
      </main>
    </>
  );
};

Checkout.getLayout = (page) => {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default PrivateRouteHOC(Checkout);

import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import Link from "next/link";
import {
  useAddToCartListMutation,
  useGetUserCartListProductsQuery,
  useUpdateCartProductQuantatyMutation,
} from "@/features/cartList/cartListApi";
import swal from "sweetalert";

function CartDrawer({ openDrawer, setOpenDrawer }) {
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
      <Drawer
        placement={"right"}
        closable={false}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
        bodyStyle={{ padding: "0px" }}
        className="w-full lg:w-[30%] "
      >
        <div className=" min-h-screen  relative">
          <div className=" bg-slate-100 p-5 flex justify-between items-center">
            <div className="flex items-center gap-2 text-lg font-bold">
              <AiOutlineShoppingCart size={25} />
              <p>Shopping Cart</p>
            </div>

            <div
              className="cursor-pointer text-red-600"
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <GiCancel size={30} />
            </div>
          </div>

          <div>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                {data?.data?.length ? (
                  <div>
                    <div className="overflow-y-scroll h-[70vh]">
                      {data?.data.map((cartItem) => (
                        <div
                          key={cartItem?._id}
                          className="flex border-b items-center py-3 px-4"
                        >
                          <img
                            className="h-20 w-20"
                            src={cartItem?.images}
                          ></img>
                          <div className="flex ml-2 items-center justify-between flex-grow">
                            <div>
                              {/* <p className="text-lg font-semibold">
                                {cartItem?.title}
                              </p> */}
                              <p className="text-gray-500 text-sm">
                                Item Price: ${cartItem?.price}
                              </p>

                              <p className="text-lg font-semibold">
                                $
                                {(cartItem?.price -
                                  (cartItem.price * cartItem?.discount) / 100) *
                                  cartItem?.quantity}
                              </p>
                            </div>
                            <div
                              className={`flex items-center content-center my-auto  py-0 rounded-md border border-gray-100 font-semibold ${
                                updateLoading && "bg-gray-200"
                              }`}
                            >
                              <div className="m-0">
                                <button
                                  disabled={cartItem?.quantity === 1}
                                  onClick={() => decQuentaty(cartItem)}
                                  className=" px-3 py-1 my-0 mx-auto text-lg "
                                >
                                  −
                                </button>
                              </div>
                              <div className="m-0">
                                <p className=" px-3 py-1 my-0 mx-auto ">
                                  {cartItem?.quantity}
                                </p>
                              </div>
                              <div className="m-0">
                                <button
                                  onClick={() => incQuentaty(cartItem)}
                                  className=" px-3 py-1 my-0 mx-auto text-lg "
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => handelRemoveCartList(cartItem)}
                            >
                              <BiTrash className="text-red-500 text-xl "></BiTrash>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex bg-white items-center border-t justify-between p-[10px] mx-5 my-3 bg-primary rounded-lg absolute bottom-0 left-0 right-0 ">
                      <div className="w-full">
                        <div className="flex justify-between items-center text-2xl font-semibold">
                          <p>Subtotal:</p>
                          <p>
                            <span className="text-red-600">
                              $
                              {data?.data.reduce(
                                (acc, product) =>
                                  acc +
                                  (product.price -
                                    (product.price * product.discount) / 100) *
                                    product.quantity,
                                0
                              )}
                            </span>
                          </p>
                        </div>
                        <Link
                          onClick={() => setOpenDrawer(!openDrawer)}
                          className="text-center w-full  text-xl p-2"
                          href={"/myCart"}
                        >
                          <p className="bg-gray-200 text-black hover:bg-black hover:text-white w-full p-2 duration-300">
                            View Cart
                          </p>
                        </Link>
                        <Link
                          onClick={() => setOpenDrawer(!openDrawer)}
                          className="text-center w-full  text-xl p-2"
                          href={"/"}
                        >
                          <p className="border text-black hover:bg-black hover:text-white w-full p-2 duration-300">
                            Checkout
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-2xl font-semibold text-center p-4">
                    <p>No Items Found!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default CartDrawer;

import { useAddToCartListMutation } from "@/features/cartList/cartListApi";
import { useAddToWishListMutation } from "@/features/wishList/wishListApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineHeart,
  AiFillEye,
  AiOutlineLink,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const ProductCard = ({ info }) => {
  const [mouseHover, setMouseHover] = React.useState("");

  const { user } = useSelector((state) => state.auth);

  const { _id, discount, price, title, images, unit } = info || {};
  const wishListed = user?.wishList?.find((id) => id === _id);
  const cartListed = user?.cartList?.find((id) => id === _id);

  const [addToWishList, { data, isSuccess, isError, error }] =
    useAddToWishListMutation();

  const [
    addToCartList,
    {
      data: cartData,
      isSuccess: cartSuccess,
      isError: isCartError,
      error: cartError,
    },
  ] = useAddToCartListMutation();

  const product = {
    title,
    images: images[0].url,
    unit,
    discount,
    price,
    totalPrice: price,
    productId: _id,
  };

  const addToWishListHandelar = () => {
    addToWishList(product);
  };

  const addToCartHandelar = () => {
    addToCartList(product);
  };

  useEffect(() => {
    if (cartSuccess) toast.success(cartData.message);
    if (isCartError) toast.error(cartError.data.message);
  }, [cartSuccess, isCartError]);

  useEffect(() => {
    if (isSuccess) toast.success(data.message);
    if (isError) toast.error(error.data.message);
  }, [isSuccess, isError]);

  return (
    <div className="mt-4 border border-black rounded-md shadow-md">
      <div
        onMouseOver={() => setMouseHover(info)}
        onMouseOut={() => setMouseHover("")}
        className="relative overflow-hidden"
      >
        <Link href={`${_id}`} className=" ">
          <div className="">
            <img
              src={images[0]?.url}
              alt=""
              className={`object-cover h-[400px] object-center w-full rounded-t-md dark:bg-gray-500 ${
                mouseHover === info ? "scale-125" : "scale-100"
              } duration-300`}
            />
          </div>
        </Link>
        <div className="absolute top-3 left-0">
          <p className="px-3 py-1.5 mt-3 bg-red-600 text-white">Sale</p>
          <p className="px-3 py-1.5 mt-2 bg-black text-white">-{discount}%</p>
        </div>

        <div
          className={`absolute left-0 w-full ${
            mouseHover === info ? "bottom-0" : " -bottom-14"
          } duration-300`}
        >
          <div className="flex">
            <button
              onClick={addToCartHandelar}
              className="flex justify-center items-center w-full p-3 text-sm font-semibold text-center text-white transition duration-100  bg-black  hover:shadow-lg"
            >
              <span>
                <AiOutlineShoppingCart size={20} />
              </span>{" "}
              {cartListed ? "Already added" : "Add to Cart"}
            </button>

            <button
              onClick={addToCartHandelar}
              className="flex justify-center items-center w-full p-3 text-sm font-semibold text-center text-white transition duration-100  bg-red-600  hover:shadow-lg"
            >
              <span>
                <AiOutlineShoppingCart size={20} />
              </span>{" "}
              Buy Now
            </button>
          </div>
        </div>

        <div
          className={`absolute top-6   ${
            mouseHover === info ? "right-4" : " -right-12"
          } duration-300 `}
        >
          <div>
            <button
              onClick={addToWishListHandelar}
              title="Add to Wishlist"
              className={`hover:text-white hover:bg-red-600   bg-white shadow-md h-10 w-10 flex justify-center items-center duration-200 ${
                wishListed ? "text-red-600 " : null
              }`}
            >
              <AiOutlineHeart size={25} />
            </button>

            <button
              title="Quic View"
              className="bg-white mt-2  hover:bg-red-600 hover:text-white shadow-md h-10 w-10 flex justify-center items-center duration-200"
            >
              <AiFillEye size={25} />
            </button>

            <button
              title="Product Details"
              className="bg-white mt-2  hover:bg-red-600 hover:text-white shadow-md h-10 w-10 flex justify-center items-center duration-200"
            >
              <AiOutlineLink size={25} />
            </button>
          </div>
        </div>
      </div>

      <div className="text-xl my-2 p-2 ">
        <p className="py-1 capitalize">{title}</p>
        <p className="py-1">
          <del>${price} </del> <span>${price - (price * discount) / 100} </span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

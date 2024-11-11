import React, { useEffect, useState } from "react";
import { SlMagnifierAdd } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import swal from "sweetalert";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
} from "@/features/products/productApi";

const ProductsTable = ({ products, showPage, setShowPage }) => {
  const [
    deleteProductById,
    {
      data: confarmation,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteProductByIdMutation();

  const [
    updateProductById,
    {
      data: updatedData,
      isLoading: updateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProductByIdMutation();

  const productDeleteHandelar = (id, name) => {
    swal({
      title: "Are you sure?",
      text: `Delete "${name}" Product!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        deleteProductById(id);
      }
    });
  };

  const handleProductPublishChange = (data) => {
    const updateData = { ...data, publish: !data.publish };

    updateProductById(updateData);
  };

  useEffect(() => {
    if (!isDeleteLoading && deleteSuccess) {
      toast.success(confarmation.message);
    }
    if (!isDeleteLoading && isDeleteError) {
      toast.error(deleteError.status);
    }
  }, [isDeleteLoading, isDeleteError, deleteSuccess]);

  useEffect(() => {
    if (!updateLoading && updateSuccess) {
      toast.success(updatedData.message);
    }
    if (!updateLoading && isUpdateError) {
      toast.error(updateError.status);
    }
  }, [updateLoading, updateError, updateSuccess]);

  return (
    <div className="container pb-8 mx-auto rounded-md  bg-gray-100">
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg bg-gray-100 border border-b-none text-gray-500 ">
            <tr className="text-left ">
              <th title="Ranking" className="p-3 text-left">
                SL
              </th>
              <th className="p-3 text-left">PRODUCT NAME</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">DISCOUNT</th>
              <th className="p-3">STOCK</th>
              <th className="p-3">DETAILS</th>
              <th className="p-3">PUBLISHED</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-[14px] ">
            {products?.data?.map((product, i) => (
              <tr
                key={"product" + i}
                className="text-left border-b border-opacity-20 border-gray-700 bg-white "
              >
                <td className="px-3 py-2 text-left">
                  <span>
                    {showPage <= 1 ? i + 1 : (showPage - 1) * 12 + i + 1}
                  </span>
                </td>
                <td className="px-3 py-2 text-left">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 p-1 rounded-full bg-gray-100"
                      src={product?.images[0]?.url}
                      alt="product"
                    />
                    <Link href={`/${product?._id}`}>
                      <span className="ml-2 capitalize">{product?.title}</span>
                    </Link>
                  </div>
                </td>
                <td className="px-3 py-2 capitalize">
                  <span>{product?.category?.name}</span>
                </td>
                <td className="px-3 py-2">
                  <span>${product?.price || 0}</span>
                </td>
                <td className="px-3  py-2 ">
                  <span>${product?.discount || 0}</span>
                </td>
                <td className="px-3 py-2">
                  <span>{product?.quantity || 0}</span>
                </td>
                <td className="px-3 py-2 text-center">
                  <Link
                    href={`/products/${product.id}`}
                    target="_blank"
                    className="hover:text-[#07895e] "
                    title="Details"
                  >
                    <SlMagnifierAdd />
                  </Link>
                </td>
                <td className="px-3 py-2">
                  <label
                    htmlFor={"publish" + i}
                    className="inline-flex items-center space-x-4 cursor-pointer text-gray-100"
                  >
                    <span className="relative">
                      <input
                        onChange={() => handleProductPublishChange(product)}
                        checked={product?.publish}
                        id={"publish" + i}
                        type="checkbox"
                        className="hidden peer"
                      />
                      <div className="w-10 h-6 rounded-full shadow-inner bg-gray-200  peer-checked:bg-[#07895e]"></div>
                      <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white"></div>
                    </span>
                  </label>
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
                    <Link href={`/admin/${product?._id}`}>
                      <button className="text-lg mr-2 font-normal text-gray-400 hover:text-[#07895e] duration-300">
                        <FaRegEdit />
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        productDeleteHandelar(product._id, product.title)
                      }
                      className="text-lg mr-2 font-normal text-gray-400 hover:text-red-600 duration-300"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="rounded-b-md text-xs bg-white shadow-md border border-t-none font-semibold text-gray-500 ">
          <div className="p-4  flex  justify-between items-center col-span-4">
            <p>
              Showing {showPage <= 1 ? 1 : (showPage - 1) * 10} -{" "}
              {showPage <= 1
                ? products.count >= 10
                  ? 10
                  : products.count
                : showPage * 10 > products?.count
                ? products?.count
                : showPage * 10}{" "}
              of {products?.count}
            </p>

            <div className="flex items-center">
              <button
                disabled={showPage === 1}
                className={`hover:bg-gray-200
                duration-300 rounded-md mx-1`}
                onClick={() => setShowPage(showPage - 1)}
              >
                <AiOutlineLeft size={20} />
              </button>

              <button
                className={`p-2 ${
                  showPage === 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-black"
                }  duration-300 rounded-md mx-1 hover:bg-red-600/40 hover:text-white`}
                onClick={() => setShowPage(showPage === 1 ? 1 : showPage - 1)}
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
                  onClick={() => setShowPage(showPage === 1 ? 3 : showPage + 1)}
                  disabled={showPage === Math.ceil(products?.count / 10)}
                >
                  {showPage === 1 ? 3 : showPage + 1}
                </button>
              )}

              <span>-</span>

              <button
                onClick={() => setShowPage(showPage + 1)}
                className="p-2 hover:bg-gray-200 duration-300 rounded-md mx-1"
              >
                {Math.ceil(products?.count / 10)}
              </button>
              <button
                disabled={showPage === Math.ceil(products?.count / 10)}
                className={`hover:bg-gray-200
               duration-300 rounded-md mx-1`}
                onClick={() => setShowPage(showPage + 1)}
              >
                <AiOutlineRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;

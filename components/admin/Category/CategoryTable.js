import { useState, useEffect } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import toast from "react-hot-toast";

import {
  useDeleteCategoryByIdMutation,
  useUpdateCategoryByIdMutation,
} from "@/features/category/categoryApi";
import { Drawer } from "antd";
import UpdateCategory from "./UpdateCategory";

const CategoryTable = ({ categories, showPage, setShowPage }) => {
  const [openDrawer, setOpenDrawer] = useState({
    open: false,
    updatedCategory: {},
  });

  const [
    deleteCategoryById,
    {
      data: confatmation,
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
      error,
    },
  ] = useDeleteCategoryByIdMutation();

  // category update function
  const [
    updateCategoryById,
    {
      data: updatedData,
      isLoading: updateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateCategoryByIdMutation();

  const deleteCategory = (deleteData) => {
    swal({
      title: "Are you sure?",
      text: `Delete "${deleteData?.name}" Category!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        deleteCategoryById(deleteData?._id);
      }
    });
  };

  const handleCategoryPublishChange = (data) => {
    const updateData = { ...data, publish: !data.publish };
    updateCategoryById(updateData);
  };

  useEffect(() => {
    if (!deleteLoading && deleteSuccess) {
      toast.success(confatmation.message);
    }
    if (!deleteLoading && deleteError) {
      toast.error(error.message);
    }
  }, [deleteLoading, deleteError, deleteSuccess]);

  useEffect(() => {
    if (!updateLoading && updateSuccess) {
      toast.success(updatedData.message);
    }
    if (!updateLoading && isUpdateError) {
      toast.error(updateError);
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
              <th className="p-3 text-left">ICON</th>
              <th className="p-3 w-[500px]">NAME</th>
              <th className="p-3">PUBLISHED</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {categories?.data?.map((category, i) => (
              <tr
                key={category?._id}
                className="text-left bg-white border-b border-opacity-20 border-gray-700 "
              >
                <td className="px-3 py-2 text-left">
                  <span>
                    {showPage <= 1 ? i + 1 : (showPage - 1) * 10 + i + 1}
                  </span>
                </td>
                <td className="px-3 py-2 text-left">
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 p-1 rounded-full bg-gray-100"
                      src={category?.icon[0]?.url}
                      alt="product"
                    />
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="text-gray-500 font-bold px-2 py-1 bg-gray-100 rounded-full mx-1 capitalize">
                    {category?.name}
                  </span>
                </td>

                <td className="px-3 py-2">
                  <label
                    htmlFor={"publish" + i}
                    className="inline-flex items-center space-x-4 cursor-pointer text-gray-100"
                  >
                    <span className="relative">
                      <input
                        id={"publish" + i}
                        type="checkbox"
                        readOnly
                        checked={category?.publish ? true : false}
                        className="hidden peer"
                        onChange={() => handleCategoryPublishChange(category)}
                      />
                      <div className="w-10 h-6 rounded-full shadow-inner bg-gray-200  peer-checked:bg-[#07895e]"></div>
                      <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white"></div>
                    </span>
                  </label>
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
                    <button
                      className="text-lg mr-2 font-normal text-gray-400 hover:text-[#07895e] duration-300"
                      onClick={() =>
                        setOpenDrawer({ open: true, updatedCategory: category })
                      }
                    >
                      <FaRegEdit />
                    </button>

                    <button
                      className="text-lg mr-2 font-normal text-gray-400 hover:text-red-600 duration-300"
                      onClick={() => deleteCategory(category)}
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
                ? categories.count >= 10
                  ? 10
                  : categories.count
                : showPage * 10 > categories.count
                ? categories.count
                : showPage * 10}{" "}
              of {categories.count}
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
                  className={`p-2 ${
                    showPage > 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-black"
                  }  duration-300 rounded-md mx-1 hover:bg-red-600 hover:text-white`}
                  onClick={() => setShowPage(showPage === 1 ? 2 : showPage)}
                >
                  {showPage === 1 ? 2 : showPage}
                </button>
              )}

              {showPage > 2 && (
                <button
                  className={`p-2 bg-gray-200 text-black duration-300 rounded-md mx-1 hover:bg-red-600/40 hover:text-white`}
                  onClick={() => setShowPage(showPage === 1 ? 3 : showPage + 1)}
                  disabled={showPage === Math.ceil(categories.count / 10)}
                >
                  {showPage === 1 ? 3 : showPage + 1}
                </button>
              )}

              <span>-</span>

              <button className="p-2 hover:bg-gray-200 duration-300 rounded-md mx-1">
                {Math.ceil(categories.count / 10)}
              </button>
              <button
                disabled={showPage === Math.ceil(categories.count / 10)}
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

      <Drawer
        title={"Update Category"}
        placement="right"
        // width={300}

        onClose={() => setOpenDrawer({ open: false, updatedCategory: {} })}
        open={openDrawer.open}
      >
        <UpdateCategory
          setCategoryDeawer={setOpenDrawer}
          data={openDrawer.updatedCategory}
        />
      </Drawer>
    </div>
  );
};

export default CategoryTable;

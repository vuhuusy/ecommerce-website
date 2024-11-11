import { useEffect } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from "sweetalert";
import toast from "react-hot-toast";

const UserTable = ({ categories, customers, showPage, setShowPage }) => {
  const deleteUser = (deleteData) => {
    swal({
      title: "Are you sure?",
      text: `Delete "${deleteData?.name}" Category!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        // deleteCategoryById(deleteData?._id);
      }
    });
  };

  const handelCreateAdminRole = (data) => {
    // const updateData = { ...data, publish: !data.publish };
    // updateCategoryById(updateData);
  };

  // useEffect(() => {
  //   if (!deleteLoading && deleteSuccess) {
  //     toast.success(confatmation.message);
  //   }
  //   if (!deleteLoading && deleteError) {
  //     toast.error(error.message);
  //   }
  // }, [deleteLoading, deleteError, deleteSuccess]);

  return (
    <div className="container pb-8 mx-auto rounded-md  bg-gray-100">
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full text-xs">
          <thead className="rounded-t-lg bg-gray-100 border border-b-none text-gray-500 ">
            <tr className="text-left ">
              <th title="Ranking" className="p-3 text-left">
                SL
              </th>
              <th className="p-3 text-left">AVATAR</th>
              <th className="p-3 w-[300px]">NAME</th>
              <th className="p-3 w-[300px]">EMAIL</th>
              <th className="p-3 w-[200px]">JOIN DATE</th>
              <th className="p-3">ROLE</th>
              <th className="p-3">CREATE ADMIN</th>
              <th className="p-3">DELETE</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {customers?.data
              .filter((el) => el.role === "user")
              ?.map((customer, i) => (
                <tr
                  key={customer?._id}
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
                        className="w-12 h-12 rounded-full bg-gray-100"
                        src={
                          customer?.avatar
                            ? customer?.avatar
                            : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                        }
                        alt="Avatar"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-gray-500 font-bold px-2 py-1 bg-gray-100 rounded-full mx-1 capitalize">
                      {`${customer?.firstName} ${customer?.lastName} `}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <span className="text-gray-500 font-bold px-2 py-1 bg-gray-100 rounded-full mx-1">
                      {customer?.email}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="text-gray-500 font-bold px-2 py-1 bg-gray-100 rounded-full mx-1 capitalize">
                      {new Date(customer?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}{" "}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <span className="text-gray-500 font-bold px-2 py-1 bg-gray-100 rounded-full mx-1 capitalize">
                      {customer?.role}
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
                          checked={customer?.publish ? true : false}
                          className="hidden peer"
                          onChange={() => handelCreateAdminRole(customer)}
                        />
                        <div className="w-10 h-6 rounded-full shadow-inner bg-gray-200  peer-checked:bg-[#07895e]"></div>
                        <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white"></div>
                      </span>
                    </label>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex justify-center items-center">
                      <button
                        className="text-lg mr-2 font-normal text-gray-400 hover:text-red-600 duration-300"
                        onClick={() => deleteUser(customer)}
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
    </div>
  );
};

export default UserTable;

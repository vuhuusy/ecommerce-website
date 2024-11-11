import { usePostNewCategoryMutation } from "@/features/category/categoryApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewCategory = ({ setCategoryDeawer }) => {
  const [preview, setPreview] = useState();

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
    publish: false,
  });

  const [postNewCategory, { isLoading, isError, isSuccess, error }] =
    usePostNewCategoryMutation();

  const showPreview = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      setPreview(() => reader.result);
      setNewCategory(() => {
        return { ...newCategory, icon: reader.result };
      });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    postNewCategory(newCategory);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setNewCategory({ name: "", icon: "", publish: false });
      setPreview();
      setCategoryDeawer(false);
      toast.success("New Category Added successfully!");
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="w-full bg-white ">
      <form onSubmit={handleSubmit}>
        <div className=" lg:grid grid-cols-1 lg:grid-cols-3  gap-6 rounded-md  text-xs">
          <p className="py-2">Category Name</p>
          <div className="col-span-2 ">
            <input
              type="text"
              name="category"
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              required
              value={newCategory.name}
              placeholder="type category name"
              className="w-full p-3 my-2 lg:m-0 rounded-md border bg-gray-100 active:bg-white"
            />
          </div>
          <p className="py-2">Category Icon</p>
          <div className="col-span-2 ">
            <fieldset className="w-full space-y-1 text-gray-100">
              <div className="flex my-2 lg:my-0">
                <input
                  required
                  type="file"
                  name="file"
                  id="file"
                  onChange={showPreview}
                  className="px-8 py-8 w-full border-2 border-dashed rounded-md border-gray-300 text-gray-400 "
                />
              </div>
            </fieldset>
            {preview && (
              <div className="w-[100px] h-[100px] p-2 border my-2 rounded-md">
                <img src={preview} alt="category icon" />
              </div>
            )}
          </div>

          <div className="flex">
            <p className="py-2">Publish</p>
            <label
              htmlFor="publish1"
              className="inline-flex lg:hidden ml-5 items-center space-x-4 cursor-pointer text-gray-100"
            >
              <span className="relative">
                <input
                  id="publish1"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      publish: e.target.checked,
                    })
                  }
                  checked={newCategory.publish}
                  type="checkbox"
                  className="hidden peer"
                  name="publish"
                />
                <div className="w-10 h-6 rounded-full shadow-inner bg-gray-200  peer-checked:bg-[#07895e]"></div>
                <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white"></div>
              </span>
            </label>
          </div>

          <div className="hidden lg:block ">
            <label
              htmlFor="publish"
              className="inline-flex items-center space-x-4 cursor-pointer text-gray-100"
            >
              <span className="relative">
                <input
                  id="publish"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      publish: e.target.checked,
                    })
                  }
                  checked={newCategory.publish}
                  type="checkbox"
                  name="publish"
                  className="hidden peer"
                />
                <div className="w-10 h-6 rounded-full shadow-inner bg-gray-200  peer-checked:bg-[#07895e]"></div>
                <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white"></div>
              </span>
            </label>
          </div>
        </div>

        <div className="text-center p-3 text-2xl text-red-600 w-full">
          {isError && error.message && error.message}
        </div>

        <div className="col-span-3 border-t py-3 px-3 my-10 flex items-center gap-6">
          <input
            type="button"
            value={"Cancel"}
            onClick={() => setCategoryDeawer(false)}
            className="py-3 px-6 bg-gray-100 rounded-md hover:bg-red-100 text-red-300 hover:text-red-600 duration-300 w-full"
          />

          <button
            disabled={isLoading}
            type="submit"
            className="py-3 px-6 bg-red-600/40 rounded-md 
        hover:bg-red-600 text-white  duration-300 w-full"
          >
            {isLoading ? "Loading..." : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCategory;

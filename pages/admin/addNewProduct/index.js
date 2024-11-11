import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import AdminLayout from "@/layouts/AdminLayout";
import Head from "next/head";
import SelectImage from "@/components/admin/Products/SelectImage";
import { useGetCategorysQuery } from "@/features/category/categoryApi";
import EditTools from "@/common/editTools";
import { usePostNewProductMutation } from "@/features/products/productApi";
import Link from "next/link";

const AddNewProduct = () => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [imgPreview, setImgPreview] = useState(false);

  const [productInfo, setProductInfo] = useState({});

  const query = {
    search: "",
    skip: 0,
  };
  const { data } = useGetCategorysQuery(query);
  const categories = data?.data?.data || [];

  const [
    postNewProduct,
    {
      isLoading: productLoading,
      isError: isProductError,
      isSuccess: productSuccess,
      error: productError,
    },
  ] = usePostNewProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    productInfo.images = images;
    productInfo.description = description;

    postNewProduct(productInfo);
  };

  useEffect(() => {
    if (productSuccess) {
      setImages([]);
      setProductInfo({
        title: "",
        category: {},
        unit: "",
        quantity: "",
        price: "",
        discount: "",
        tags: "",
        description: "",
        images: [],
        publish: false,
        wishList: [],
        cartList: [],
        buyList: [],
      });
      setDescription("");
      toast.success("New Product Added Successfully!");
    }

    if (isProductError) {
      toast.error(productError?.data?.message);
    }
  }, [productSuccess, isProductError]);

  useEffect(() => {
    if (images.length > 0) {
      setImgPreview(true);
    } else {
      setImgPreview(false);
    }
  }, [images]);

  return (
    <>
      <Head>
        <title>Thêm sản phẩm mới</title>
      </Head>
      <main>
        <div className="flex justify-end relative">
          <div className="w-full bg-white ">
            <div className="bg-gray-100 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg">Thêm sản phẩm mới</h2>
                <p className="text-xs">
                  Add your product information from here
                </p>
              </div>

              <div>
                <button className="text-2xl h-10 w-10 bg-white text-red-600 rounded-full flex justify-center items-center shadow-md">
                  <TiDeleteOutline />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className=" lg:my-2 lg:grid grid-cols-1 lg:grid-cols-4 p-6  gap-5 rounded-md shadow-sm  bg-white text-xs">
                <p className="py-2 capitalize">Title</p>
                <div className="col-span-3 ">
                  <input
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        title: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="text"
                    placeholder="Product Title"
                    value={productInfo?.title}
                  />
                </div>
                <p className="my-1">Images</p>
                <div className="col-span-3 ">
                  <SelectImage
                    imgPreview={imgPreview}
                    images={images}
                    setImages={setImages}
                  />
                </div>

                <p className="py-2">Category</p>
                <div className="col-span-3 ">
                  <select
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        category: JSON.parse(e.target.value),
                      })
                    }
                    className="w-full p-2 rounded-md border bg-gray-100 active:bg-white capitalize"
                  >
                    <option
                      selected={!productInfo?.categories?._id}
                      value={"no select"}
                      className="hidden"
                    >
                      Select Category
                    </option>

                    {categories?.map((category) => (
                      <option
                        key={category._id}
                        value={JSON.stringify({
                          name: category.name,
                          id: category._id,
                        })}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="py-2 capitalize">Unit</p>
                <div className="col-span-3 ">
                  <input
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        unit: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="text"
                    placeholder="Product Unit ex:(kg/pc/lb/ml/g...etc)"
                    value={productInfo?.unit}
                  />
                </div>

                <p className="py-2 capitalize">quantity</p>
                <div className="col-span-3 ">
                  <input
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        quantity: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="number"
                    placeholder="quantity"
                    value={productInfo?.quantity}
                  />
                </div>

                <p className="py-2 capitalize">price</p>
                <div className="col-span-3 ">
                  <input
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        price: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="number"
                    placeholder="price"
                    value={productInfo?.price}
                  />
                </div>

                <p className="py-2 capitalize">discount</p>
                <div className="col-span-3 ">
                  <input
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        discount: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="number"
                    placeholder="discount"
                    value={productInfo?.discount}
                  />
                </div>

                <p className="py-2 capitalize">tags</p>
                <div className="col-span-3 ">
                  <input
                    onChange={(e) =>
                      setProductInfo({
                        ...productInfo,
                        tags: e.target.value,
                      })
                    }
                    required
                    className="w-full p-3 focus:outline-none rounded-md border bg-gray-100"
                    type="text"
                    placeholder="tags"
                    value={productInfo?.tags}
                  />
                </div>

                <p className="py-2">Description</p>
                <div className="col-span-3 ">
                  <EditTools
                    name={"description"}
                    value={description}
                    setValue={setDescription}
                  />
                </div>

                <p className="py-2">Publish</p>
                <div className="col-span-3 ">
                  <label
                    htmlFor="publish"
                    className="inline-flex items-center space-x-4 cursor-pointer text-gray-100"
                  >
                    <span className="relative">
                      <input
                        onChange={(e) =>
                          setProductInfo({
                            ...productInfo,
                            publish: e.target.checked,
                          })
                        }
                        checked={productInfo?.publish}
                        id="publish"
                        name="publish"
                        type="checkbox"
                        className="hidden peer"
                      />
                      <div className="w-10 h-6 rounded-full shadow-inner bg-gray-200  peer-checked:bg-[#07895e]"></div>
                      <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto bg-white"></div>
                    </span>
                  </label>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div className="my-6 flex items-center w-[400px]">
                  <Link
                    href={"/admin/products"}
                    className="py-3 px-6 m-1 bg-gray-100 rounded-md hover:bg-red-100 text-red-300 hover:text-red-600 duration-300 w-full cursor-pointer text-center"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={productLoading}
                    className="py-3 px-6 m-1 bg-red-600/50 rounded-md 
                    hover:bg-red-600 text-white  duration-300 w-full"
                  >
                    {productLoading ? "Creating..." : "Add Product"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

AddNewProduct.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AddNewProduct;

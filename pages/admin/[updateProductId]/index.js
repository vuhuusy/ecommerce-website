import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import AdminLayout from "@/layouts/AdminLayout";
import Head from "next/head";
import SelectImage from "@/components/admin/Products/SelectImage";
import { useGetCategorysQuery } from "@/features/category/categoryApi";
import EditTools from "@/common/editTools";
import {
  useGetSingleProductQuery,
  useUpdateProductByIdMutation,
} from "@/features/products/productApi";
import Link from "next/link";
import { useRouter } from "next/router";

const UpdateProduct = () => {
  const router = useRouter();
  const { updateProductId } = router.query;

  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [imgPreview, setImgPreview] = useState(false);
  const [removeOldImages, setRemoveOldImages] = useState(false);

  const [productInfo, setProductInfo] = useState({});

  const query = {
    search: "",
    skip: 0,
  };

  const { data, isLoading, isError, isSuccess } = useGetCategorysQuery(query);
  const categories = data?.data || [];

  const {
    data: product,
    isLoading: productLoading,
    isSuccess: productSuccess,
  } = useGetSingleProductQuery(updateProductId);

  // update RTK function
  const [
    updateProductById,
    {
      isLoading: updateLoding,
      isError: isUpdateError,
      error: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateProductByIdMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (removeOldImages && images.length > 0) {
      updateProductById({ ...productInfo, description, images });
    } else {
      updateProductById({ ...productInfo, description });
    }
  };

  useEffect(() => {
    if (images.length > 0) {
      setImgPreview(true);
    } else {
      setImgPreview(false);
    }
  }, [images]);

  useEffect(() => {
    if (product?.data?._id && !productLoading && productSuccess) {
      setProductInfo(product?.data);
      setDescription(product?.data?.description);
    }
  }, [product, productSuccess, productLoading]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Product updated Successfully!");
      router.push("/admin/products");
    }
  }, [updateSuccess]);

  return (
    <>
      <Head>
        <title>Cập nhật sản phẩm</title>
      </Head>
      <main>
        <div className="flex justify-end relative">
          <div className="w-full bg-white ">
            <div className="bg-gray-100 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg">Cập nhật sản phẩm</h2>
                <p className="text-xs">
                  Cập nhật thông tin sản phẩm của bạn ở đây
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
                    placeholder="Tiêu đề sản phẩm ở đây"
                    value={productInfo?.title}
                  />
                </div>
                <p className="my-1">Ảnh</p>
                <div className="col-span-3 ">
                  {removeOldImages ? (
                    <SelectImage
                      defaultImages={productInfo?.images}
                      imgPreview={imgPreview}
                      images={images}
                      setImages={setImages}
                    />
                  ) : (
                    <div className="w-full flex bg-gray-100 relative ">
                      <p
                        onClick={() => setRemoveOldImages(true)}
                        className="text-2xl h-10 w-10 bg-white text-red-600
                    absolute -top-3 -left-3 rounded-full flex justify-center
                    items-center shadow-md cursor-pointer"
                        title="Cancel Old
                    Images"
                      >
                        <TiDeleteOutline />
                      </p>

                      {productInfo?.images?.map((preview, i) => (
                        <div className="border m-1  my-2 rounded-md" key={i}>
                          <img
                            src={preview.url}
                            alt="product image"
                            className="h-[100px] w-[100px] rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="py-2">Phân loại</p>
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
                      selected={!productInfo?.categories?.id}
                      value={""}
                      className="hidden"
                    >
                      Chọn loại sản phẩm
                    </option>

                    {categories?.data?.map((category) => (
                      <option
                        selected={productInfo?.categories?._id === category._id}
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

                <p className="py-2 capitalize">Đơn vị</p>
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
                    placeholder="đơn vị"
                    value={productInfo?.unit}
                  />
                </div>

                <p className="py-2 capitalize">số lượng</p>
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

                <p className="py-2 capitalize">giá</p>
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

                <p className="py-2 capitalize">giảm giá</p>
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

                <p className="py-2">Mô tả</p>
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
                    Hủy
                  </Link>

                  <button
                    type="submit"
                    // disabled={productLoading}
                    className="py-3 px-6 m-1 bg-red-600/50 rounded-md 
                    hover:bg-red-600 text-white  duration-300 w-full"
                  >
                    {updateLoding ? "Updating..." : "Update Product"}
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

UpdateProduct.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateProduct;

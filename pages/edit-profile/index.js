import { useUserInfoUpdateMutation } from "@/features/user/userApi";
import CommonLayout from "@/layouts/commonLayout";
import CustomerLayout from "@/layouts/customerLayout";
import PrivateRouteHOC from "@/routes/PrivateRoute";
import Head from "next/head";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [preview, setPreview] = useState();
  const [userInfo, setUserInfo] = useState(user);

  const [userInfoUpdate, { isLoading, isError, isSuccess, error }] =
    useUserInfoUpdateMutation();

  const showPreview = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      setUserInfo({ ...userInfo, avatar: reader.result });
      setPreview(() => reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userInfoUpdate(userInfo);
  };

  useEffect(() => {
    if (user?._id) {
      setUserInfo(userInfo);
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Cập nhật hồ sơ thành công");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError]);
  return (
    <>
      <Head>
        <title>Hồ sơ | Chi tiết</title>
      </Head>
      <main>
        <section className="p-3 my-16 lg:p-0">
          <CommonLayout>
            <form
              onSubmit={handleSubmit}
              className="container flex flex-col mx-auto space-y-12"
            >
              <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200">
                <div className="space-y-2 col-span-full lg:col-span-1">
                  <p className="font-medium">Thông tin cá nhân</p>
                  <p className="text-xs">
                  Vui lòng cung cấp thông tin cá nhân của bạn theo mẫu dưới đây.
                    Thông tin này là cần thiết để xử lý đơn đặt hàng của bạn và
                    đảm bảo đơn hàng được giao hàng tới tận tay bạn. Chúng tôi 
                    coi trọng sự riêng tư của bạn và sử dụng dữ liệu cá nhân 
                    của bạn một cách bảo mật tối đa.
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="firstname" className="text-sm">
                      Tên
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, firstName: e.target.value })
                      }
                      value={userInfo.firstName}
                      type="text"
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="lastname" className="text-sm">
                      Họ
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, lastName: e.target.value })
                      }
                      value={userInfo.lastName}
                      type="text"
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="email" className="text-sm">
                      Số điện thoại
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          phone: e.target.value,
                        })
                      }
                      value={userInfo.phone}
                      type="text"
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="email" className="text-sm">
                      Địa chỉ Email
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
                      Địa chỉ nhận hàng
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, address: e.target.value })
                      }
                      value={userInfo.address}
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="city" className="text-sm">
                      Tỉnh / Thành phố
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, city: e.target.value })
                      }
                      value={userInfo.city}
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="state" className="text-sm">
                      Quận / Huyện
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, state: e.target.value })
                      }
                      value={userInfo.state}
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div>
                  {/* <div className="col-span-full sm:col-span-2">
                    <label htmlFor="zip" className="text-sm">
                      Mã bưu điện
                    </label>
                    <input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, zip: e.target.value })
                      }
                      value={userInfo.zip}
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-700 text-gray-900 p-2"
                    />
                  </div> */}
                </div>

                <div className="space-y-2 col-span-full lg:col-span-1">
                  <p className="font-medium">Ảnh hồ sơ</p>
                  <p className="text-xs"></p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full">
                    <label htmlFor="bio" className="text-sm">
                      Photo
                    </label>
                    <div className="flex items-center space-x-2">
                      {preview ? (
                        <img
                          src={preview}
                          alt=""
                          className="w-14 h-14 rounded-full bg-gray-500 "
                        />
                      ) : (
                        <img
                          src={
                            userInfo.avatar
                              ? userInfo.avatar
                              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                          }
                          alt=""
                          className="w-14 h-14 rounded-full bg-gray-500 "
                        />
                      )}

                      <div className="flex my-2 lg:my-0">
                        <input
                          type="file"
                          name="file"
                          id="file"
                          onChange={showPreview}
                          className="px-8 py-8 w-full border-2 border-dashed rounded-md border-gray-300 text-gray-400 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div className="flex justify-center items-center">
                <button className="w-full lg:w-[200px] lg:text-xl lg:px-8 lg:py-4 py-2 px-4 bg-blue-400 hover:bg-blue-600 text-white font-semibold rounded-md ">
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </CommonLayout>
        </section>
      </main>
    </>
  );
};

EditProfile.getLayout = function (page) {
  return <CustomerLayout>{page}</CustomerLayout>;
};

export default PrivateRouteHOC(EditProfile);

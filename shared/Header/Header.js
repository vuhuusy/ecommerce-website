import CommonLayout from "@/layouts/commonLayout";
import Link from "next/link";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { RiFacebookFill } from "react-icons/ri";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineBars,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
  AiFillSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { HiOutlineXMark } from "react-icons/hi2";
import CartDrawer from "@/components/CartDrawer";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/features/auth/authSlice";
import { useGetLoginUserQuery } from "@/features/auth/authApi";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [userMenu, setUserMenu] = React.useState(false);
  const [search, setSearch] = useState("");

  console.log(open);

  const route = useRouter();
  const isAdminRoute = route?.pathname.split("/")[1] === "admin";

  const dispatch = useDispatch();
  useGetLoginUserQuery();

  const { user } = useSelector((state) => state.auth);

  const Links = [
    { name: "Trang chủ", link: "/" },
    { name: "Cửa hàng", link: "/shop" },
    { name: "Liên hệ với chúng tôi", link: "/contact-us" },
    { name: "Về chúng tôi", link: "/about-us" },
  ];

  const handelSearch = (e) => {
    e.preventDefault();

    route.push(`/shop?search=${search}`);
  };

  const handelUserLogout = () => {
    dispatch(userLoggedOut());
  };

  return (
    <section className="w-full z-50 border-b shadow-sm bg-[#F0F2EE]">
      <CommonLayout>
        <div
          className={`hidden p-3 lg:flex  items-center ${
            isAdminRoute ? "justify-end" : "justify-between"
          }`}
        >
          {!isAdminRoute && (
            <div className="flex items-center">
              <Link href={"/"}>
                <img
                  src="/home/msi/Desktop/harri-eCommerce-client/pictures/Logo.png"
                  alt="logo"
                />
              </Link>
              <div className="ml-8">
                {Links.map((menu) => (
                  <Link key={menu.name} className="mx-2" href={menu.link}>
                    {menu.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center">
            <div className="relative">
              <form onSubmit={handelSearch}>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white w-[300px] py-2 px-3 rounded-full"
                  type="text"
                  placeholder="tìm kiếm sản phẩm..."
                />

                <button className="absolute right-3 top-2.5">
                  <BsSearch
                    className="text-gray-500 hover:text-gray-700"
                    size={20}
                  />
                </button>
              </form>
            </div>

            <div className="ml-4 flex items-center">
              <div className="relative">
                <button onClick={() => setUserMenu(!userMenu)} className="mx-2">
                  <div>
                    {user?.email ? (
                      <div>
                        {user?.avatar ? (
                          <img
                            src={user?.avatar}
                            className="h-12 w-12 rounded-full border"
                            alt=""
                          />
                        ) : (
                          <FiUser
                            size={30}
                            className="border rounded-full p-1 border-black"
                          />
                        )}
                      </div>
                    ) : (
                      <FiUser size={25} />
                    )}
                  </div>
                </button>

                {/* user modal menu  */}
                {userMenu && (
                  <div
                    className="absolute z-50 bottom-100 rounded-lg shadow-lg -left-12
               text-gray-600 text-sm font-semibold  bg-white w-[150px]"
                  >
                    <div>
                      {user ? (
                        <>
                          {user?.role === "admin" ? (
                            <Link
                              href={"/admin/dashboard"}
                              className="w-full flex items-center p-3 duration-300 hover:bg-gray-200 "
                            >
                              <RxDashboard className="mr-2" />
                              <span className="">Dashbord</span>
                            </Link>
                          ) : (
                            <Link
                              href={"/orders"}
                              className="w-full flex items-center p-3 duration-300 hover:bg-gray-200 "
                            >
                              <RxDashboard className="mr-2" />
                              <span className="">My Orders</span>
                            </Link>
                          )}

                          <Link
                            href={"/edit-profile"}
                            className="w-full flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                          >
                            <AiFillSetting className="mr-2" />
                            <span className="">Edit Profile</span>
                          </Link>

                          <button
                            onClick={handelUserLogout}
                            className="w-full rounded-lg rounded-t-none flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                          >
                            <AiOutlineLogout className="mr-2" />
                            <span className="">Log Out</span>
                          </button>
                        </>
                      ) : (
                        <Link href="/login">
                          <button
                            onClick={() => setUserMenu(false)}
                            className="w-full rounded-lg rounded-t-none flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                          >
                            <AiOutlineLogout className="mr-2" />
                            <span className="">Log in</span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link href={"/myWishlist"} className="">
                <div className="relative cursor-pointer">
                  <button className="mx-1">
                    <AiOutlineHeart size={30} />
                  </button>

                  {user?.wishList.length > 0 && (
                    <small className="absolute cursor-pointer top-0 right-0 w-5 h-5 flex justify-center items-center  bg-red-600 text-white font-bold rounded-full">
                      {user?.wishList.length}
                    </small>
                  )}
                </div>
              </Link>

              <div
                className="relative "
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <button className="mx-2">
                  <AiOutlineShoppingCart size={30} />
                </button>

                {user?.cartList.length > 0 && (
                  <div className="cursor-pointer">
                    <small className="absolute top-0 right-0 w-5 h-5 flex justify-center items-center bg-red-600 text-white font-bold rounded-full">
                      {user?.cartList?.length}
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        <div className=" lg:hidden fixed left-0 w-full border-b z-50 shadow-sm">
          <div className="">
            <div className="flex h-[7vh] px-3 bg-[#F0F2EE] items-center justify-between">
              <img
                src="/home/msi/Desktop/harri-eCommerce-client/pictures/Logo.png"
                alt="logo"
              />
              {open ? (
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 flex justify-center items-center rounded-full border shadow-md"
                >
                  <HiOutlineXMark size={25} />
                </button>
              ) : (
                <button
                  className="w-10 h-10 flex justify-center items-center "
                  onClick={() => setOpen(!open)}
                >
                  <AiOutlineBars size={25} />
                </button>
              )}
            </div>

            <div
              className={`absolute  w-full ${
                open ? "left-0" : "left-[100%] duration-300"
              } bg-white`}
            >
              <div className="h-[93vh] w-full">
                <div className="m-3">
                  <ul>
                    {Links.map((menu) => (
                      <li
                        key={menu.name}
                        className="border-b py-2"
                        onClick={() => setOpen(!open)}
                      >
                        <Link className="mx-2" href={menu.link}>
                          {menu.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-center w-full">
                  <div className="ml-4 flex items-center">
                    <div className="relative">
                      <button
                        onClick={() => setUserMenu(!userMenu)}
                        className="mx-2"
                      >
                        <div>
                          {user?.email ? (
                            <div>
                              {user?.avatar ? (
                                <img
                                  src={user?.avatar}
                                  className="h-12 w-12 rounded-full border"
                                  alt=""
                                />
                              ) : (
                                <FiUser
                                  size={30}
                                  className="border rounded-full p-1 border-black"
                                />
                              )}
                            </div>
                          ) : (
                            <FiUser size={25} />
                          )}
                        </div>
                      </button>

                      {/* user modal menu  */}
                      {userMenu && (
                        <div className="absolute z-50 bottom-100 rounded-lg shadow-lg -left-12 text-gray-600 text-sm font-semibold  bg-white w-[150px]">
                          <div onClick={() => setOpenDrawer(!open)}>
                            {user ? (
                              <>
                                {user?.role === "admin" ? (
                                  <Link
                                    href={"/admin/dashboard"}
                                    className="w-full flex items-center p-3 duration-300 hover:bg-gray-200 "
                                  >
                                    <RxDashboard className="mr-2" />
                                    <span className="">Dashbord</span>
                                  </Link>
                                ) : (
                                  <Link
                                    href={"/orders"}
                                    className="w-full flex items-center p-3 duration-300 hover:bg-gray-200 "
                                  >
                                    <RxDashboard className="mr-2" />
                                    <span className="">My Orders</span>
                                  </Link>
                                )}

                                <Link
                                  href={"/edit-profile"}
                                  className="w-full flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                                >
                                  <AiFillSetting className="mr-2" />
                                  <span className="">Edit Profile</span>
                                </Link>

                                <button
                                  onClick={handelUserLogout}
                                  className="w-full rounded-lg rounded-t-none flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                                >
                                  <AiOutlineLogout className="mr-2" />
                                  <span className="">Log Out</span>
                                </button>
                              </>
                            ) : (
                              <Link href="/login">
                                <button
                                  onClick={() => setOpen(!open)}
                                  className="w-full rounded-lg rounded-t-none flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                                >
                                  <AiOutlineLogout className="mr-2" />
                                  <span className="">Log in</span>
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link href={"/myWishlist"} className="">
                      <div className="relative cursor-pointer">
                        <button className="mx-1">
                          <AiOutlineHeart size={30} />
                        </button>

                        {user?.wishList.length > 0 && (
                          <small className="absolute cursor-pointer top-0 right-0 w-5 h-5 flex justify-center items-center  bg-red-600 text-white font-bold rounded-full">
                            {user?.wishList.length}
                          </small>
                        )}
                      </div>
                    </Link>

                    <div
                      className="relative "
                      onClick={() => setOpenDrawer(!openDrawer)}
                    >
                      <button className="mx-2">
                        <AiOutlineShoppingCart size={30} />
                      </button>

                      {user?.cartList.length > 0 && (
                        <div className="cursor-pointer">
                          <small className="absolute top-0 right-0 w-5 h-5 flex justify-center items-center bg-red-600 text-white font-bold rounded-full">
                            {user?.cartList?.length}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-b mt-28 py-8 px-2">
                  <p className="font-semibold">Follow :</p>

                  <div className=" flex items-center mt-2">
                    <div className="w-8 h-8 flex justify-center items-center border">
                      <a href="https://www.facebook.com/shohagroy.7771/">
                        <RiFacebookFill size={20} />
                      </a>
                    </div>

                    {/* <div className="w-8 h-8 ml-1 flex justify-center items-center border">
                      <a href="https://twitter.com/shohagroy27">
                        <AiOutlineTwitter size={20} />
                      </a>
                    </div> */}

                    {/* <div className="w-8 h-8 ml-1 flex justify-center items-center border">
                      <a href="https://www.linkedin.com/in/shohag-roy/">
                        <AiFillLinkedin size={20} />
                      </a>
                    </div> */}

                    {/* <div className="w-8 h-8 ml-1 flex justify-center items-center border">
                      <a href="https://github.com/shohagroy">
                        <AiFillGithub size={20} />
                      </a>
                    </div> */}
                  </div>
                </div>

                <div className="mt-10 m-2">
                  <p className="text-2xl font-bold">+84 328 139 753</p>
                  <p>cskh@dailysweets.com</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full">
                <img
                  className="w-full "
                  src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foffcanvas-shape-1.d0d69b5e.png&w=750&q=75"
                  alt="background_image"
                />
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>

      <CartDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      ></CartDrawer>
    </section>
  );
};

export default Header;

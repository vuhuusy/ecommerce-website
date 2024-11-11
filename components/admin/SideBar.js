import Link from "next/link";
import React from "react";
import { RxDashboard } from "react-icons/rx";
import { RiShoppingBag3Fill } from "react-icons/ri";
import {
  AiOutlineBars,
  AiOutlineShoppingCart,
  AiOutlineGift,
  AiOutlineLogout,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();

  const sideNavItem = [
    {
      name: "dashbord",
      pathname: "/admin/dashboard",
      icon: <RxDashboard />,
      link: "../admin/dashboard",
    },
    {
      name: "products",
      pathname: "/admin/products",
      pathname2: "/admin/[updateProductId]",
      pathname3: "/admin/addNewProduct",
      icon: <RiShoppingBag3Fill />,
      link: "../admin/products",
    },
    {
      name: "category",
      pathname: "/admin/category",
      icon: <AiOutlineBars />,
      link: "../admin/category",
    },
    {
      name: "customers",
      pathname: "/admin/customers",
      icon: <FiUsers />,
      link: "../admin/customers",
    },
    {
      name: "orders",
      pathname: "/admin/orders",
      icon: <AiOutlineShoppingCart />,
      link: "../admin/orders",
    },
    {
      name: "coupons",
      pathname: "/admin/coupons",
      icon: <AiOutlineGift />,
      link: "../admin/coupons",
    },
    {
      name: "our staff",
      icon: <BiUser />,
      link: "../admin/ourStaff",
    },
    {
      name: "setting",
      icon: <FiSettings />,
      link: "../admin/setting",
    },
  ];

  return (
    <div className="hidden lg:block w-[250px] min-h-screen">
      {/* nav menu  */}
      <div className="  fixed  top-0 bg-[#F0F2EE] shadow-md left-0 w-[250px] h-screen">
        <div className=" flex p-5 items-center">
          <Link href={"/"}>
            <img
              src="https://hamart-shop.vercel.app/_next/static/media/logo-black.de19b08e.svg"
              alt="logo"
            />
          </Link>
        </div>

        {/* menu item  */}
        <div className="text-md font-semibold ">
          {sideNavItem?.map((item) => {
            const { name, icon, link, pathname, pathname2, pathname3 } =
              item || {};

            const isActive =
              router.pathname === pathname ||
              pathname2 ||
              router.pathname === pathname3;
            return (
              <Link key={name} href={link}>
                <button
                  className={`w-full  relative flex items-center px-6 py-3 duration-300 hover:bg-gray-100 hover:text-red-600 ${
                    (router.pathname === pathname &&
                      "text-red-600 hover:text-red-600") ||
                    (router.pathname === pathname2 &&
                      "text-red-600 hover:text-red-600") ||
                    (router.pathname === pathname3 &&
                      "text-red-600 hover:text-red-600")
                  } `}
                >
                  {icon}
                  {/* <{icon} className="mr-4" /> */}
                  <span className="ml-4 capitalize">{name}</span>

                  {(router.pathname === pathname && (
                    <span className="absolute rounded-r-md left-0 h-full border-l-4 border-red-600 "></span>
                  )) ||
                    (router.pathname === pathname2 && (
                      <span className="absolute rounded-r-md left-0 h-full border-l-4 border-red-600 "></span>
                    )) ||
                    (router.pathname === pathname3 && (
                      <span className="absolute rounded-r-md left-0 h-full border-l-4 border-red-600 "></span>
                    ))}
                </button>
              </Link>
            );
          })}
        </div>

        {/* logout button  */}
        {/* <div className="absolute bottom-44 lg:bottom-4 w-full ">
          <div className=" flex justify-center items-center ">
            <button className="flex items-center px-14 py-2 rounded-lg font-semibold duration-300 hover:bg-[#016a47] text-white bg-[#0E9F6E]">
              <AiOutlineLogout className="mr-2" />
              <span className="">Log Out</span>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SideBar;

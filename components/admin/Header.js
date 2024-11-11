import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { AiOutlineLogout, AiFillSetting, AiFillHome } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import Link from "next/link";
import MobileSidebar from "./MobileSideBar";
import { Drawer } from "antd";

const Header = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openSideNav, setOpenSideNav] = useState(false);

  return (
    <nav className="border-b shadow-sm bg-[#F0F2EE]">
      <div className="lg:max-w-[1240px] xl:max-w-[1440px] w-full mx-auto p-3 flex items-center justify-between lg:justify-end  text-xl text-red-600">
        <div className=" lg:hidden flex items-center ">
          {/* hambarger  */}
          <button onClick={() => setOpenSideNav(!openSideNav)}>
            <GoThreeBars />
          </button>

          <Link href={"/"}>
            <img
              className="ml-20"
              src="https://hamart-shop.vercel.app/_next/static/media/logo-black.de19b08e.svg"
              alt="logo"
            />
          </Link>
        </div>

        <div className="flex items-center  ">
          {/* button  */}
          <div className="mr-5">
            <button className="p-3 md:mx-1">
              <AiFillHome />
            </button>
            <button className="p-3 relative">
              <FaBell />
              <div className="absolute top-0 left-1 ">
                <p className="flex justify-center text-sm items-center text-red-600 bg-white rounded-full h-5 w-5">
                  7
                </p>
              </div>
            </button>
          </div>

          <div className="relative">
            {/* avatar  */}
            <div className="flex-shrink-0">
              <button onClick={() => setOpenProfileModal(!openProfileModal)}>
                <img
                  src="https://source.unsplash.com/50x50/?portrait"
                  alt=""
                  className="w-8 h-8 border rounded-full bg-gray-500 border-gray-700"
                />
              </button>
            </div>

            {/* user pfoile modal  */}
            {openProfileModal && (
              <div className="absolute bottom-100 rounded-lg shadow-lg right-0 text-gray-600 text-sm font-semibold  bg-white w-[250px]">
                <div>
                  <Link
                    href={"/admin/dashbord"}
                    className="w-full flex items-center p-3 duration-300 hover:bg-gray-200 "
                  >
                    <RxDashboard className="mr-2" />
                    <span className="">Dashbord</span>
                  </Link>

                  <Link
                    href={"/admin/setting"}
                    className="w-full flex font-sm p-3 duration-300 hover:bg-gray-200 items-center"
                  >
                    <AiFillSetting className="mr-2" />
                    <span className="">Edit Profile</span>
                  </Link>

                  <button className="w-full rounded-lg rounded-t-none flex font-sm p-3 duration-300 hover:bg-gray-200 items-center">
                    <AiOutlineLogout className="mr-2" />
                    <span className="">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        placement="left"
        open={openSideNav}
        width={250}
        onClose={() => setOpenSideNav(false)}
      >
        <MobileSidebar />
      </Drawer>
    </nav>
  );
};

export default Header;

import CommonLayout from "@/layouts/commonLayout";
import React from "react";
import { RiFacebookFill } from "react-icons/ri";
import {
  // AiOutlineTwitter,
  // AiFillLinkedin,
  // AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <section className="mt-8 p-3 lg:p-0 ">
      <CommonLayout>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div>
            <img
              src="Logo.png"
              alt="logo"
            />

            <p className="text-gray-500 w-[250px] my-2">
            Something Sweet Just For You.
            </p>

            <div className="my-3">
              <div className=" flex items-center mt-2">
                <button className="w-8 h-8 flex justify-center items-center border">
                  <RiFacebookFill size={20} />
                </button>

                {/* <button className="w-8 h-8 ml-1 flex justify-center items-center border">
                  <AiOutlineTwitter size={20} />
                </button> */}

                {/* <button className="w-8 h-8 ml-1 flex justify-center items-center border">
                  <AiFillLinkedin size={20} />
                </button>

                <button className="w-8 h-8 ml-1 flex justify-center items-center border">
                  <AiFillYoutube size={20} />
                </button> */}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Thông tin chung</h2>
            <div className="mt-4 text-gray-500">
              <ul>
                <li> Về chúng tôi </li>
                <li> Lịch sử </li>
                <li> Địa chỉ </li>
                <li> Blogs </li>
                <li> Đánh giá </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Sản phẩm</h2>
            <div className="mt-4 text-gray-500">
              <ul>
                <li> Bánh ngọt </li>
                <li> Sữa hạt </li>
                {/* <li> Computers & Laptop</li> */}
                {/* <li> Sport Watches </li> */}
                {/* <li> Phiếu giảm giá </li> */}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Cần hỗ trợ?</h2>
            <div className="mt-4 text-gray-500">
              <ul>
                <li> FAQs </li>
                <li> Reviews </li>
                <li> Liên hệ với chúng tôi </li>
                <li> Giao hàng </li>
                <li> Trả hàng </li>
              </ul>
            </div>
          </div>
          <div>
          <h2 className="text-2xl font-bold">Talk to us</h2>
            <div className="mt-4 text-gray-500">
              <p>
                Địa chỉ ở gần bạn: <br /> 
                Xem{" "}
                <a
                  href="https://maps.app.goo.gl/MJMT33FP6v9xWg7Z8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600"
                >
                  đường đi
                </a>
              </p>

              <p className="text-2xl font-bold text-black py-3">
                +84 328 139 753
              </p>

              <p>cskh@dailysweets.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="border-t py-4">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center ">
              <p className="text-sm lg:text-md py-2">
                Copyright © 2024 by{" "}
                <span className="text-red-600"> syvh </span> rights
                reserved.
              </p>

              <div className="my- lg:my-0">
                <img
                  src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=256&q=75"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </section>
  );
};

export default Footer;

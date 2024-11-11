import CommonLayout from "@/layouts/commonLayout";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const HomeBanar = () => {
  return (
    <section className="h-[80vh] bg-[#F0F2EE] overflow-hidden ">
      <CommonLayout>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-3  gap-4 w-full h-full">
          <div className="flex flex-col z-30 justify-end lg:items-start lg: lg:justify-center leading-none h-full ">
            <div className="">
              <p className="leading-0 text-gray-500 font-semibold pl-2 border-l-2 border-red-600">
                Best Ear <br /> Headphones
              </p>

              <p className="mt-2 text-4xl lg:text-6xl font-semibold">
                Something Sweet <br /> Just For You
              </p>

              <div className="border w-[150px] lg:mt-10 flex justify-center items-center duration-300 mt-3 border-black hover:bg-[#171871] hover:text-white">
                <button className="p-3 flex  justify-center">
                  Shop Now
                  <span>
                    <FiArrowRight />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className=" relative h-full w-full z-20  ">
            <div className="absolute -bottom-16 lg:-right-28 -right-4 z-10 h-[350px] w-[345px] lg:h-[700px] lg:w-[700px] bg-white rounded-full"></div>
            <div className="absolute bottom-0 right-4 lg:block z-30">
              <img
                className="h-[250px] lg:h-[500px] "
                src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslider-1.b3c73448.png&w=1080&q=75"
                alt="banar model"
              />
            </div>
          </div>
        </div>
      </CommonLayout>
    </section>
  );
};

export default HomeBanar;

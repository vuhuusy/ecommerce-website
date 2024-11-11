import CommonLayout from "@/layouts/commonLayout";
import React from "react";

const Subscribe = () => {
  return (
    <section
      className="my-6 relative lg:p-10 p-3 "
      style={{
        backgroundImage: `url(https://hamart-shop.vercel.app/_next/static/media/cta-bg-1.3e8b3216.jpg)`,
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <CommonLayout>
        <div className="bg-white lg:p-5  p-3 m-5 flex items-center flex-col lg:flex-row justify-between">
          <div className="w-full">
            <p className="text-2xl lg:text-4xl font-bold lg:p-6">
              Subscribe for <br /> Latest Trends & Offers
            </p>
          </div>

          <div className="w-full relative">
            <input
              type="text"
              className="w-full lg:p-4 p-2 my-2  border-2 border-black focus:outline-none"
              placeholder="Enter Your Email"
            />
            <button className=" lg:absolute top-4 lg:mt-0   right-3 bg-black text-white px-8 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </CommonLayout>
    </section>
  );
};

export default Subscribe;

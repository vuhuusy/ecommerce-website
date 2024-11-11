import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { GrFormNextLink } from "react-icons/gr";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CommonLayout from "@/layouts/commonLayout";

const OfferBanar = () => {
  return (
    <section className="pt-3 lg:p-0 my-6">
      <CommonLayout>
        <div className="relative text-white text-[20px] w-full mx-auto">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowPrev={(clickHandler, hasPrev) => (
              <div
                onClick={clickHandler}
                className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
              >
                <BiArrowBack className="text-sm md:text-lg" />
              </div>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <div
                onClick={clickHandler}
                className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
              >
                <BiArrowBack className="rotate-180 text-sm md:text-lg" />
              </div>
            )}
          >
            {[...Array(5)].map((Number, i) => (
              <div className="" key={i}>
                <img
                  src="https://hamart-shop.vercel.app/_next/static/media/banner-1.a1774ed4.jpg"
                  className="aspect-[16/10] md:aspect-auto object-cover  lg:h-[400px] w-full"
                />
                <div className="absolute top-0 left-0 lg:top-[100px] lg:left-[100px] ">
                  <div className="w-full h-full m-6 ">
                    <div className="text-left leading-none">
                      <p className="text-sm lg:text-xl text-gray-500 ">
                        Apple iPhone 12 Pro
                      </p>
                      <p className="text-3xl lg:text-5xl font-bold text-black">
                        The wait is on: iphone <br /> 12 max pro
                      </p>
                      <p className="text-sm text-red-400 ">
                        Last call for up to{" "}
                        <span className="text-2xl text-red-600 font-bold ">
                          32%
                        </span>
                        off!
                      </p>

                      <button className="bg-white my-3 text-sm lg:text-xl font-bold flex justify-center items-center text-black py-2 px-4">
                        Buy Now
                        <span>
                          <GrFormNextLink />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </CommonLayout>
    </section>
  );
};

export default OfferBanar;

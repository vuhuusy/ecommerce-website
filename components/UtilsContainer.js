import CommonLayout from "@/layouts/commonLayout";
import React from "react";
import { TbTruckDelivery, TbMessages } from "react-icons/tb";
import { RiRefund2Fill } from "react-icons/ri";
import { GiSwipeCard } from "react-icons/gi";
import Subscribe from "@/common/Subscribe";

const UtilsContainer = () => {
  return (
    <section className="my-3 lg:my-12 ">
      <CommonLayout>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-3 lg:p-0">
          <div className="flex justify-start items-center">
            <div className="w-16 h-16 rounded-full border mr-4 flex justify-center items-center text-gray-500">
              <TbTruckDelivery size={30} />
            </div>

            <div className="w-[200px]">
              <p className="text-xl font-bold">Free Shipping</p>
              <p className="text-gray-500">
                Free Shipping for orders over $120
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center">
            <div className="w-16 h-16 rounded-full border mr-4 flex justify-center items-center text-gray-500">
              <RiRefund2Fill size={30} />
            </div>

            <div className="w-[200px]">
              <p className="text-xl font-bold">Refund</p>
              <p className="text-gray-500">Within 30 days for an exchange.</p>
            </div>
          </div>

          <div className="flex justify-start items-center">
            <div className="w-16 h-16 rounded-full border mr-4 flex justify-center items-center text-gray-500">
              <TbMessages size={30} />
            </div>

            <div className="w-[200px]">
              <p className="text-xl font-bold">Support</p>
              <p className="text-gray-500">24 hours a day, 7 days a week</p>
            </div>
          </div>

          <div className="flex justify-start items-center">
            <div className="w-16 h-16 rounded-full border mr-4 flex justify-center items-center text-gray-500">
              <GiSwipeCard size={30} />
            </div>

            <div className="w-[200px]">
              <p className="text-xl font-bold">Payment</p>
              <p className="text-gray-500">Pay with Multiple Credit Cards</p>
            </div>
          </div>
        </div>
      </CommonLayout>
      <Subscribe />
    </section>
  );
};

export default UtilsContainer;

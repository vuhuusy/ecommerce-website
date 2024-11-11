import CommonLayout from "@/layouts/commonLayout";
import React from "react";
import ProductLoading from "./ProductLoading";

const ShopLoader = () => {
  return (
    <section>
      <CommonLayout>
        <div className="flex flex-col lg:m-8 rounded shadow-md w-full animate-pulse">
          <div className="h-[500px] rounded-t bg-gray-500"></div>

          <div className="flex justify-between items-center my-3">
            <div className="w-full h-14 mx-2 rounded bg-gray-400"></div>
            <div className="w-full h-14 mx-2 rounded bg-gray-400"></div>
            <div className="w-full h-14 mx-2 rounded bg-gray-400"></div>
          </div>
        </div>

        <ProductLoading />
      </CommonLayout>
    </section>
  );
};

export default ShopLoader;

import CommonLayout from "@/layouts/commonLayout";
import React from "react";

const ProductLoading = () => {
  return (
    <CommonLayout>
      <div>
        <div className="hidden lg:grid grid-cols-4 gap-4 p-2">
          {[...Array(8)].map((num, i) => (
            <div
              key={i}
              className="flex flex-col rounded shadow-md w-full animate-pulse h-96"
            >
              <div className="h-48 rounded-t bg-gray-500"></div>
              <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
                <div className="w-full h-6 rounded bg-gray-400"></div>
                <div className="w-full h-6 rounded bg-gray-400"></div>
                <div className="w-3/4 h-6 rounded bg-gray-400"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:hidden grid-cols-1 gap-4 p-2">
          {[...Array(3)].map((num, i) => (
            <div
              key={i}
              className="flex flex-col rounded shadow-md w-full animate-pulse h-96"
            >
              <div className="h-48 rounded-t bg-gray-500"></div>
              <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
                <div className="w-full h-6 rounded bg-gray-400"></div>
                <div className="w-full h-6 rounded bg-gray-400"></div>
                <div className="w-3/4 h-6 rounded bg-gray-400"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CommonLayout>
  );
};

export default ProductLoading;

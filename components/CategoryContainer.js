import { useGetCategorysQuery } from "@/features/category/categoryApi";
import CommonLayout from "@/layouts/commonLayout";
import Link from "next/link";
import React from "react";

const CategoryContainer = () => {
  const query = { search: "", skip: 0 };
  const { data: categories } = useGetCategorysQuery(query);

  return (
    <section className="my-6 p-3 lg:p-0">
      <CommonLayout>
        <div className="relative w-full flex gap-2 overflow-x-auto text-center font-semibold text-gray-500 ">
          {categories?.data?.data?.map((category) => {
            const { name, icon, _id } = category || {};
            return (
              <div key={_id}>
                <Link href={`shop?searchCategory=${_id}`}>
                  <div
                    key={name}
                    className="h-44 relative capitalize aspect-video rounded-sm "
                  >
                    <img
                      className="h-44 w-full  object-center"
                      src={icon[0]?.url}
                      alt={name}
                    />

                    <div className="absolute left-0 top-0 p-3 text-black w-full h-full">
                      <p className="text-center bg-white rounded-full p-1 mt-32">
                        {name}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </CommonLayout>
    </section>
  );
};

export default CategoryContainer;

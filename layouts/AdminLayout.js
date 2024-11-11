import SideBar from "@/components/admin/SideBar";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className="flex">
        <div className="">
          <SideBar />
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

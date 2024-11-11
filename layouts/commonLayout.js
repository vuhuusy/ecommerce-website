import React from "react";

const CommonLayout = ({ children }) => {
  return <div className="max-w-[1460px] mx-auto h-full px-3">{children}</div>;
};

export default CommonLayout;

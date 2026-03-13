import React from "react";

const SubHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b border-[#CFCFCF] py-6 px-[5%] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {children}
    </div>
  );
};

export default SubHeader;
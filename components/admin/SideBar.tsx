import Image from "next/image";
import React from "react";

const SideBar = () => {
    
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            alt="logo"
            src="/icons/admin/logo.svg"
            width={50}
            height={50}
          />
          <p>Admin</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import { Session } from "next-auth";
import React from "react";

const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-200 font-semibold text-2xl">
          Welcome, {session?.user?.name}!
        </h2>
        <p className="text-base text-slate-500">
          monitor all the books and the library
        </p>
      </div>
      {/* <div>
        <p>search</p>{" "}
      </div> */}
    </header>
  );
};

export default Header;

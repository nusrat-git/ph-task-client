import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="navbar bg-base-100 flex items-center justify-between">
        <div className="">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            daisyUI
          </Link>
        </div>
        <div className="mr-4">
          <h1 className="text-2xl">Paid : 0</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div>
      <div className="navbar bg-base-100 flex items-center justify-between">
        <div className="">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            daisyUI
          </Link>
        </div>
        <div className="mr-4">
          <button
            type="submit"
            onClick={handleLogOut}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

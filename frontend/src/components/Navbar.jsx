import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuthStore();
  return (
    <div className="sticky navbar bg-base-100 px-5 py-3 mx-auto md:max-w-[70%] w-full">
      <div className="flex-1">
        <a className="font-semibold ml-1 md:ml-4 p-2 text-lg md:text-xl">
          Blogsite
        </a>
      </div>
      <div className="hidden md:flex flex-row w-56 justify-around mr-10 items-center">
        <Link
          className="p-3 ease-in-out hover:border-b-2 delay-50 hover:text-white border-white "
          to="/home"
        >
          Home
        </Link>
        <Link
          className="p-3 ease-in-out hover:border-b-2 delay-50 hover:text-white border-white "
          to="/post-blog"
        >
          Create blog
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li> */}
            <li className="md:hidden visible">
              <Link to="/home">Home</Link>
            </li>
            <li className="md:hidden visible">
              <Link to="/post-blog">Create blog</Link>
            </li>
            <li onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

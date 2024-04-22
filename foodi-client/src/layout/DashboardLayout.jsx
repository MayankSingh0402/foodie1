import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from "react-icons/md";
import { FaEdit, FaLocationArrow, FaQuestion, FaQuestionCircle, FaRegUser, FaUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaCartShopping, FaCirclePlus } from "react-icons/fa6";
import logo from "/logo.png";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to='/'>
        <MdDashboard />
        Home
      </Link>
    </li>
    <li className="mt-1">
      <Link to='/menu'>
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li className="mt-1">
      <Link to='/menu'>
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li className="mt-1">
      <Link to='/menu'>
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);
const DashboardLayout = () => {
  const {loading} = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  return (
    <div>
      {
        isAdmin?(<div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <MdDashboardCustomize />
            </label>

            <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
              <FaRegUser />
              Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}

            <li className="flex justify-start mb-3">
              <Link to={"/dashboard"}>
                <img src={logo} alt="logo" className="w-20" />
                <span>
                  <div className="badge badge-primary">Admin</div>
                </span>
              </Link>
            </li>

            <li className="mt-3">
              <Link to={"/dashboard"}>
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={"/dashboard"}>
                <FaShoppingBag />
                Manage Booking
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/add-menu"}>
                <FaCirclePlus />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/manage-items"}>
                <FaEdit />
                Manage Items
              </Link>
            </li>
            <li className="mb-3">
              <Link to={"/dashboard/users"}>
                <FaUser />
                All Users
              </Link>
            </li>
            <hr/>

            {/* shared nav links */}
            {
              sharedLinks
            }
          </ul>
        </div>
      </div>):(<Login/>)
      }
    </div>
  );
};

export default DashboardLayout;

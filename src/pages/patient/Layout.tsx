import { Link, Outlet } from "react-router";
import {
    Admin,
  Deliveries,
  Dispatch,
  Overview,
  Patients,
} from "../../components/Icons";
import UserMenu from "../../components/ProfileDropdown";

const Layout = () => {
  return (
    <div className="bg-gray-100">
      <header className="flex items-center justify-between py-4 px-[5%] bg-white border-b border-gray-200 sticky top-0">
        <img src="/assets/nimr-logo.png" className="w-10.75 h-10.75" />
        <nav className="self-end -mb-4 [&_a]:py-4 [&_a]:px-2 [&_a]:hover:bg-gray-100">
          <ul className="flex gap-4">
            <li>
              <Link
                to={""}
                className="text-gray-500 flex items-center justify-center gap-2"
              >
                <Overview /> Overview
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-gray-500 flex items-center justify-center gap-2"
              >
                <Deliveries /> Deliveries
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="flex items-center justify-center gap-2 text-blue-700 font-semibold border-b-3"
              >
                <Patients /> Patients
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-gray-500 flex items-center justify-center gap-2"
              >
                <Dispatch /> Dispatch Riders
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-gray-500 flex items-center justify-center gap-2"
              >
                <Admin /> Admin
              </Link>
            </li>
          </ul>
        </nav>
        {/* <button className="flex gap-2 hover:bg-gray-200 transition-all p-2 rounded-3xl" aria-label="Profile">
            <img src="/assets/user.png" className="w-7.5 h-7.5 rounded-full" />
            <span className="font-semibold">Emmanuel Adigwe</span>
            <span><ChevronDown /></span>
        </button> */}
        <UserMenu />
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;

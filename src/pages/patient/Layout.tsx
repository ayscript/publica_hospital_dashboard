import { Outlet } from "react-router";
import Header from "../../components/Header";

const Layout = () => {
  return (
    <div className="bg-gray-100 flex-1 min-h-screen">
      {/* <header className="flex items-center justify-between py-4 px-[5%] bg-white border-b border-gray-200 sticky top-0 z-50">
        <img src="/assets/nimr-logo.png" className="w-10.75 h-10.75" />
        <nav className="self-end -mb-4 [&_a]:py-4 [&_a]:px-2 [&_a]:hover:bg-gray-100 max-sm:hidden">
          <Navigation />
        </nav>
        <UserMenu />
      </header> */}
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

import { NavLink } from "react-router"; // Ensure NavLink is imported
import { Admin, Deliveries, Dispatch, Overview, Patients } from "./Icons";

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  className = "",
  onLinkClick,
}) => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 py-4 px-2 transition-colors hover:bg-gray-100 ${
      isActive
        ? "text-blue-700 font-semibold sm:border-b-3 sm:border-blue-700 max-sm:bg-blue-50"
        : "text-gray-500"
    }`;

  return (
    <ul className={`flex ${className}`}>
      <li onClick={onLinkClick}>
        <NavLink to="/dashboard/overview" className={navLinkClasses} end>
          <Overview /> Overview
        </NavLink>
      </li>
      <li onClick={onLinkClick}>
        <NavLink to="/dashboard/delivery" className={navLinkClasses} end>
          <Deliveries /> Deliveries
        </NavLink>
      </li>
      <li onClick={onLinkClick}>
        <NavLink to="/dashboard" className={navLinkClasses} end>
          <Patients /> Patients
        </NavLink>
      </li>
      <li onClick={onLinkClick}>
        <NavLink to="/dashboard/dispatch" className={navLinkClasses} end>
          <Dispatch /> Dispatch Riders
        </NavLink>
      </li>
      <li onClick={onLinkClick}>
        <NavLink to="/dashboard/admin" className={navLinkClasses} end>
          <Admin /> Admin
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation
import { useState } from "react";
import Navigation from "./Navigation";
import UserMenu from "./ProfileDropdown";



export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-[5%]">
        {/* Left: Logo */}
        <img
          src="/assets/nimr-logo.png"
          alt="NIMR Logo"
          className="w-10 h-10 object-contain"
        />

        {/* Center: Desktop Navigation */}
        <nav className="self-end -mb-4 hidden md:block">
          <Navigation className="flex-row gap-4" />
        </nav>

        {/* Right: User Menu & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <UserMenu />

          {/* Hamburger Icon (Visible only on smaller screens) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2">
          <nav className="px-[5%] py-4">
            {/* Pass flex-col to stack items vertically.
              onLinkClick closes the menu instantly when a user taps a link.
            */}
            <Navigation
              className="flex-col gap-2"
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
          </nav>
        </div>
      )}
    </header>
  );
}

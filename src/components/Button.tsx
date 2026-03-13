import React, { type ReactNode, type ButtonHTMLAttributes } from "react";

// Define the available variants as a union type
type ButtonVariant = "primary" | "secondary" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  // Overriding 'disabled' from ButtonHTMLAttributes to ensure our styles react to it
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  // Base classes (Layout and Typography)
  const baseClasses =
    "px-6 py-3 font-medium text-sm transition-all duration-200 border flex items-center justify-center gap-2";

  // Logic to determine the active style
  // If the 'disabled' prop is true, we force the 'disabled' look regardless of variant
  const getVariantClasses = (): string => {
    if (disabled) {
      return "bg-[#abc4ff] border-[#abc4ff] text-white cursor-not-allowed";
    }

    switch (variant) {
      case "secondary":
        return "bg-transparent border-[#1d61f2] text-[#1d61f2] hover:bg-blue-50";
      case "primary":
      default:
        return "bg-[#1d61f2] border-[#1d61f2] text-white hover:bg-blue-700";
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

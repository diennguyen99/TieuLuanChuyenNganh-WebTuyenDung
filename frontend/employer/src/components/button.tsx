import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`py-2 px-5 focus:outline-none text-white border transition-colors ${
      canClick
        ? "bg-indigo-500 border-indigo-500 hover:text-indigo-500 hover:bg-white"
        : "bg-gray-300 border-gray-300 pointer-events-none "
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);

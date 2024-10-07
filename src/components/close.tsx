import React from "react";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-2 right-2 text-lavender-blue-500 hover:text-lavender-blue-600 p-1 rounded-full hover:bg-lavender-blue-800 transition-colors"
      aria-label="Close"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
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
    </button>
  );
};

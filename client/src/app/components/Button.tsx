import React from "react";

interface CommonButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function CommonButton({ text, onClick, disabled = false }: CommonButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-6 w-full p-4 text-lg font-semibold rounded-lg transition duration-200 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
}

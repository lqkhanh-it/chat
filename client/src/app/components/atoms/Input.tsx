import React from "react";

interface CommonInputProps {
  type?: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CommonInput({ type = "text", placeholder, value, onChange, disabled }: CommonInputProps) {
  return (
    <input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      autoComplete="on"
      autoFocus
      onChange={onChange}
      className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    />
  );
}

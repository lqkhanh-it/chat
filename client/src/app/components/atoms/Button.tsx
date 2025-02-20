import { Loader2 } from "lucide-react";

interface CommonButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function CommonButton({ text, onClick, disabled = false, loading }: CommonButtonProps) {
  return (
    <button
    className={`mt-4 w-full py-3 px-6 text-white font-semibold rounded-lg 
    transition duration-300 ease-in-out 
    flex justify-center items-center
    ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
    `}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {loading ? (
      <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
    ) : null}
    {loading ? "Logging in..." : text}
  </button>
  );
}

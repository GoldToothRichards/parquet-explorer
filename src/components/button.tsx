import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (() => Promise<void>) | (() => void);
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 border-lavender-blue-500 border-[3px] transition-all rounded-sm py-1 px-8 my-2 font-semibold text-white bg-black shadow-[5px_5px_0px_#7888ff] ${disabled ? "opacity-25" : "hover:bg-lavender-blue-300 hover:text-black active:bg-lavender-blue-500 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"}`}
    >
      {children}
    </button>
  );
};

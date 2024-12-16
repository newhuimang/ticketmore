import { FontStyles, ColorStyles, Font, BGColor, TextColor } from "@/type/style";

export default function Button({
  variant = "fill",
  font = "p1R",
  bgColor = "PRIMARY",
  textColor = variant === "fill" ? "WHITE" : "DARK",
  label,
  width,
  size = 40,
  className,
  onClick,
  disabled = false,
  type = "button",
}: {
  variant?: "text" | "fill" | "outline" | "icon";
  font?: Font;
  bgColor?: BGColor;
  textColor?: TextColor;
  label: React.ReactNode;
  width?: string | number;
  size?: 12 | 16 | 24 | 32 | 40 | 50 | 60;
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  switch (variant) {
    case "fill":
      return (
        <button
          type={type}
          className={`${className} ${disabled ? "bg-base-A text-dark-300 cursor-not-allowed " : `${ColorStyles.bgColor[bgColor]} ${ColorStyles.textColor[textColor]} hover:shadow-basic`} ${FontStyles[font]} ${size === 40 || size === 60 ? "rounded-[12px]" : "rounded-[8px]"} flex items-center justify-center`}
          onClick={onClick}
          disabled={disabled}
          style={{
            height: size,
            width: typeof width === "string" || typeof width === "number" ? width : "100%",
          }}
        >
          {label}
        </button>
      );
    case "text":
      return (
        <button
          type={type}
          className={`${className} ${FontStyles[font]} ${ColorStyles.textColor[textColor]} ${disabled ? "text-dark-300 cursor-not-allowed" : "text-dark hover:bg-base-A"} flex items-center hover:rounded-[8px] px-[16px] `}
          onClick={onClick}
          disabled={disabled}
          style={{
            height: size,
            width: typeof width === "string" || typeof width === "number" ? width : "auto",
          }}
        >
          {label}
        </button>
      );
    case "outline":
      return (
        <button
          type={type}
          className={`${className} ${FontStyles[font]} ${ColorStyles.textColor[textColor]} rounded-full flex items-center justify-center px-[16px] py-[4px] ${disabled ? "bg-white border border-dark-200 text-dark-300 cursor-not-allowed" : "bg-white hover:bg-primary-900 border border-dark-500 hover:border-primary-900 text-dark hover:text-white"}`}
          onClick={onClick}
          disabled={disabled}
          style={{ width: typeof width === "string" || typeof width === "number" ? width : "auto" }}
        >
          {label}
        </button>
      );
    case "icon":
      return (
        <button
          type={type}
          className={`${className} hover:bg-base-A flex items-center`}
          onClick={onClick}
          style={{
            height: size,
            width: typeof width === "string" || typeof width === "number" ? width : "auto",
          }}
        >
          {label}
        </button>
      );
    default:
      "err";
  }
}

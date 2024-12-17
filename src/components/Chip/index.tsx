import { BGColor, ColorStyles } from "@/type/style";

export default function Chip({
  label,
  bgColor = "PRIMARY",
  variant = "fill",
}: {
  label: React.ReactNode;
  bgColor?: BGColor;
  variant?: "fill" | "outline";
}) {
  switch (variant) {
    case "fill":
      return (
        <div
          className={`${ColorStyles.bgColor[bgColor]} flex items-center justify-center rounded-full min-w-[48px] h-[24px] px-[12px]`}
        >
          <span className="text-span1Bt text-white">{label}</span>
        </div>
      );
    case "outline":
      return (
        <div className="px-[12px] h-[32px] bg-white border border-base_B flex justify-center items-center rounded-full">
          {label}
        </div>
      );
    default:
      "err";
  }
}

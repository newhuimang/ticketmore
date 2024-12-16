import { BGColor, ColorStyles } from "@/type/style";

export default function Dot({ size, bgColor = "PRIMARY" }: { size: number; bgColor: BGColor }) {
  return (
    <div
      className={`${ColorStyles.bgColor[bgColor]} rounded-full`}
      style={{
        width: size,
        height: size,
        display: "inline-block",
      }}
    />
  );
}

import React from "react";

interface DividerProps {
  width?: string | number;
  height?: string | number;
  type?: "horizontal" | "vertical";
  color?: string;
}

export default function Divider({
  width = "100%",
  height = "1px",
  type = "horizontal",
  color = "bg-dark-100",
}: DividerProps) {
  const style: React.CSSProperties = {
    width: type === "horizontal" ? width : "1px",
    height: type === "vertical" ? height : "1px",
  };

  return <div style={style} className={`${color ? color : `bg-dark-100`}`} />;
}

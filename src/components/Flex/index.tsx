interface FlexProps {
  key?: string | number | null;
  width?: string | number;
  direction?: "column" | "row";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  items?: "start" | "end" | "center" | "baseline" | "stretch";
  gap?: {
    column?: number;
    row?: number;
  };
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
  onMouseEnter?: (e: any) => void;
  onMouseLeave?: (e: any) => void;
}

export default function Flex({
  key = null,
  width,
  direction,
  justify = "start",
  items = "start",
  gap,
  children,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: FlexProps) {
  const styles: React.CSSProperties = {
    width: typeof width === "string" || typeof width === "number" ? width : "auto",
    display: "flex",
    flexDirection: direction,
    justifyContent: {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    }[justify],
    alignItems: {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      baseline: "baseline",
      stretch: "stretch",
    }[items],
    columnGap: gap?.column ? `${gap.column}px` : 0,
    rowGap: gap?.row ? `${gap.row}px` : 0,
    ...style,
  };

  return (
    <div
      key={key}
      className={`${className} box-border`}
      style={styles}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

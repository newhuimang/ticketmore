export default function MobileRoot({
  width,
  children,
  className,
}: {
  width?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white ${width ? `w-[${width}]` : "w-full"} flex flex-col px-[12px] py-[24px] gap-y-[24px] ${className}`}
    >
      {children}
    </div>
  );
}

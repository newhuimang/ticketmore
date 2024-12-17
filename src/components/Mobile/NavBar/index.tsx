import Flex from "@/components/Flex";
import { useEffect, useState } from "react";

export default function MobileNavBar({
  icon,
  title,
  onClick,
}: {
  icon?: React.ReactNode;
  title?: string;
  onClick?: (id: any) => void;
}) {
  const [headerStyle, setHeaderStyle] = useState<number>(0);

  const updateScroll = () => {
    setHeaderStyle(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <Flex
      width="100vw"
      justify="center"
      items="center"
      className={`fixed h-[52px] bg-[#ffffff70] backdrop-blur-[100px] z-10 box-border ${headerStyle > 52 ? "shadow-key border-b border-primary-100" : ""}`}
    >
      {icon && (
        <Flex
          width="32px"
          justify="center"
          items="center"
          className="absolute h-[32px] top-1/2 translate-y-[-50%] left-[6px]"
          onClick={onClick}
        >
          {icon}
        </Flex>
      )}
      {title && <p className="text-p1B text-dark">{title}</p>}
    </Flex>
  );
}

import { GridFill, HouseFill, PersonFill, Search } from "react-bootstrap-icons";
import { useMainTab } from "@/store/useMainTab";
import Flex from "@/components/Flex";
import MobileIntro from "@/pages/Mobile/Intro";
import MobileSearch from "@/components/Mobile/Search";
import MobileCategory from "@/components/Mobile/Category";
import MobileMy from "./My";

interface NavList {
  component: React.ReactNode;
  menu: {
    icon: React.ReactNode;
    label: string;
  };
  values: "home" | "category" | "search" | "my";
}

export default function MobileMainTab() {
  const { isActive, setIsActive } = useMainTab();

  const navItems: NavList[] = [
    {
      component: <MobileCategory />,
      menu: { icon: <GridFill size={16} className="fill-inherit" />, label: "카테고리" },
      values: "category",
    },
    {
      component: <MobileIntro />,
      menu: { icon: <HouseFill size={16} className="fill-inherit" />, label: "홈" },
      values: "home",
    },
    {
      component: <MobileSearch />,
      menu: { icon: <Search size={16} className="fill-inherit" />, label: "검색" },
      values: "search",
    },
    {
      component: <MobileMy />,
      menu: { icon: <PersonFill size={16} className="fill-inherit" />, label: "마이" },
      values: "my",
    },
  ];

  return (
    <>
      {navItems.map((list, index) => (
        <Flex key={index} width={"100%"}>
          {isActive === list.values && list.component}
        </Flex>
      ))}

      <div className="fixed z-10 w-full bottom-0 translate-y-[-16px] flex justify-center left-0">
        <ul className="w-[calc(100vw-18px)] bg-white rounded-full px-[24px] py-[12px] flex justify-between shadow-bottomNav">
          {navItems.map((items, i) => (
            <li
              key={i}
              onClick={() => setIsActive(items.values)}
              className={`flex items-center h-[32px] ${isActive === items.values ? "bg-base-A px-[16px] justify-between min-w-[80px] gap-x-[8px] rounded-full" : "justify-center"}`}
            >
              <div
                className={`flex items-center justify-center ${isActive === items.values ? "fill-primary" : "fill-dark-300"}`}
              >
                {items.menu.icon}
              </div>

              <span
                className={`
                  ${isActive === items.values ? "text-p2R text-primary animate-fadeIn" : "text-p2R hidden"}
                `}
              >
                {items.menu.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

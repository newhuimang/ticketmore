import React, { useState } from "react";
import Flex from "@/components/Flex";
import { ChevronRight } from "react-bootstrap-icons";

interface TabItem {
  name: string;
  content: React.ReactNode;
}

interface TabProps {
  items: TabItem[];
  onClick?: () => void;
}

function DesktopTab({ items, onClick }: TabProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Flex direction="column" gap={{ row: 16 }}>
      <Flex items="center" justify="between">
        <Flex
          width="w-fit"
          items="center"
          gap={{ column: 24 }}
          className="px-[16px]"
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`text-str2B ${activeTab === index ? "text-primary" : "text-dark-300"}`}
            >
              {item.name}
            </button>
          ))}
        </Flex>
        <button
          className="flex gap-x-[8px] items-center px-[16px] h-[40px] hover:bg-base-A hover:rounded-[8px]"
          onClick={onClick}
        >
          <div className="text-p2R text-dark-500">더보기</div>
          <ChevronRight size={12} className="fill-dark-500" />
        </button>
      </Flex>

      {items[activeTab].content}
    </Flex>
  );
}

export { DesktopTab };

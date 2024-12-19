import React, { useState } from "react";
import Flex from "@/components/Flex";

interface TabItem {
  name: string;
  content: React.ReactNode;
}

interface TabProps {
  default?: number;
  position?: "left" | "center" | "right";
  items: TabItem[];
  onClick?: (tabName: string) => void;
}

export default function MobileTab({
  default: defaultTab = 0,
  position = "left",
  items,
  onClick,
}: TabProps) {
  const [activeTab, setActiveTab] = useState<number>(defaultTab);

  const handleTabClick = (index: number, tabName: string) => {
    setActiveTab(index);
    onClick && onClick(tabName);
  };

  const tabPosition: React.CSSProperties = {
    marginLeft: ["right", "center"].includes(position) ? "auto" : undefined,
    marginRight: ["left", "center"].includes(position) ? "auto" : undefined,
  };

  return (
    <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
      <Flex width={"content"} gap={{ column: 16 }} style={tabPosition}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index, item.name)}
            className={`${activeTab === index ? "text-primary text-p1B" : "text-dark-300 text-p1R"}`}
          >
            {item.name}
          </button>
        ))}
      </Flex>
      <Flex width={"100%"}>{items[activeTab].content}</Flex>
    </Flex>
  );
}

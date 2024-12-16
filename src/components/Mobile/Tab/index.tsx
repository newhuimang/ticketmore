import React, { useState } from "react";
import Flex from "@/components/Flex";

interface TabItem {
  name: string;
  content: React.ReactNode;
}

interface TabProps {
  items: TabItem[];
  onClick?: () => void;
}

export default function MobileTab({ items }: TabProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
      <Flex width={"100%"} gap={{ column: 16 }}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`text-p2B ${activeTab === index ? "text-primary" : "text-dark-300"}`}
          >
            {item.name}
          </button>
        ))}
      </Flex>
      <Flex width={"100%"}>{items[activeTab].content}</Flex>
    </Flex>
  );
}

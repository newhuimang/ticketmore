import Flex from "@/components/Flex";
import MobileNavBar from "@/components/Mobile/NavBar";
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

interface listProps {
  title: string;
  children?: React.ReactNode;
  list: Array<{
    label: string;
    contents: React.ReactNode;
    values: string;
  }>;
}

export default function MobileCategoryTab({
  title,
  children,
  list,
}: listProps) {
  const [categoryActive, setCategoryActive] = useState<string>("");

  const navigate = useNavigate();

  return (
    <>
      <MobileNavBar
        title={title}
        icon={<ArrowLeft className="fill-dark" size={16} />}
        onClick={() => navigate(-1)}
      />

      <Flex width={"100%"} direction="column" className="pt-[52px]">
        <Flex
          width={"100%"}
          items="center"
          justify="center"
          className="bg-purple-500 h-[20vh] text-purple-500"
        >
          {children && children}
        </Flex>

        <Flex width={"100%"} direction="column" className="px-[12px]">
          <Flex width={"100%"} className="bg-white overflow-x-auto py-[12px]">
            <Flex width={"fit-content"} gap={{ column: 8 }}>
              {list.map((list, idx) => {
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-center rounded-full px-[24px] py-[8px] box-border ${categoryActive === list.values ? "bg-primary-900" : "bg-white border border-dark-300"}`}
                    onClick={() => setCategoryActive(list.values)}
                  >
                    <span
                      className={`text-nowrap ${categoryActive === list.values ? "text-p2B text-white" : "text-p2R text-dark-300"}`}
                    >
                      {list.label}
                    </span>
                  </div>
                );
              })}
            </Flex>
          </Flex>
          {list.map((list, index) => (
            <Flex
              key={index}
              width={"100%"}
              className="max-h-[calc(100vh-102px)] overflow-auto"
            >
              {categoryActive === list.values && list.contents}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  );
}

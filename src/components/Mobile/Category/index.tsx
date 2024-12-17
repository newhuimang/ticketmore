import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Flex from "@/components/Flex";
import { ChevronRight } from "react-bootstrap-icons";
import MobileNavBar from "../NavBar";
import Button from "@/components/Button";

interface CateProps {
  label: string;
  link: string;
  list: Array<{
    subtitle: string;
    subLink: string;
  }>;
}

export default function MobileCategory() {
  const [isActive, setIsActive] = useState<string>("공연");
  const navigate = useNavigate();

  const categoryList: CateProps[] = [
    {
      label: "공연",
      link: "/performance",
      list: [
        { subtitle: "콘서트", subLink: "/concert" },
        { subtitle: "뮤지컬", subLink: "/musical" },
        { subtitle: "연극", subLink: "/theater" },
        { subtitle: "페스티벌", subLink: "/festival" },
        { subtitle: "클래식/무용", subLink: "/classic-dance" },
      ],
    },
    {
      label: "스포츠",
      link: "/sports",
      list: [
        { subtitle: "야구", subLink: "/baseball" },
        { subtitle: "축구", subLink: "/football" },
        { subtitle: "농구", subLink: "/basketball" },
        { subtitle: "배구", subLink: "/volleyball" },
        { subtitle: "아이스하키", subLink: "/ice-hockey" },
        { subtitle: "기타", subLink: "/other-sports" },
      ],
    },
    {
      label: "전시/관람",
      link: "/exh-view",
      list: [
        { subtitle: "행사", subLink: "/events" },
        { subtitle: "뮤지엄", subLink: "/museum" },
        { subtitle: "전시회", subLink: "/exhibitions" },
      ],
    },
  ];

  return (
    <>
      <MobileNavBar title="카테고리" />

      <Flex width={"100%"} direction="column" className="mt-[52px] bg-white">
        <Flex width={"100%"}>
          <ul
            className={`w-[80px] flex flex-col pt-[60px] min-w-[80px] box-border border-r border-t border-primary-100 h-[calc(100vh-40px)]`}
          >
            {categoryList.map((cate, index) => (
              <li
                key={index}
                className="relative w-full flex justify-center items-center px-[6px] h-[52px]"
                onClick={() => setIsActive(cate.label)}
              >
                <span
                  className={`${
                    isActive === cate.label
                      ? `absolute text-p1B text-white bg-primary px-[12px] py-[8px] w-[90px] top-1/2 translate-y-[-50%] left-[12px] flex justify-center items-center rounded-full`
                      : `text-p1R text-dark-300`
                  }`}
                >
                  {cate.label}
                </span>
              </li>
            ))}
          </ul>

          <Flex width={"100%"} direction="column" className="pb-[16px]">
            {categoryList
              .filter((category) => category.label === isActive)
              .map((category, key) => (
                <Flex
                  key={key}
                  width={"100%"}
                  justify="end"
                  items="center"
                  className="pl-[50px] h-[52px] border-t border-b border-primary-100 bg-base-A box-border pr-[12px]"
                >
                  <Button
                    variant="text"
                    label={
                      <Flex items="center" gap={{ column: 8 }}>
                        <p>전체보기</p>
                        <ChevronRight size={14} className="fill-dark-500" />
                      </Flex>
                    }
                    textColor="DARK"
                    font="p2R"
                    onClick={() => navigate(`/${category.link}`)}
                  />
                </Flex>
              ))}

            <Flex
              width={"100%"}
              gap={{ row: 24 }}
              className="pl-[50px] pt-[16px] pr-[12px]"
            >
              {categoryList
                .filter((category) => category.label === isActive)
                .map((category, i) => (
                  <ul key={i} className="w-full flex flex-col gap-y-[16px]">
                    {/* 선택된 카테고리의 항목들 */}
                    {category.list.map((item, index) => (
                      <>
                        <li key={index} className="w-full text-p1R py-[8px]">
                          <Link to={`/${item.subLink}`}>{item.subtitle}</Link>
                        </li>
                      </>
                    ))}
                  </ul>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

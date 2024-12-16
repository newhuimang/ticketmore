import Button from "@/components/Button";
import Flex from "@/components/Flex";
import useFeedback from "@/store/useFeedback";
import { XLg } from "react-bootstrap-icons";

export default function MobileRecentSearch() {
  const { alert } = useFeedback();
  const recent = ["기아 타이거즈", "2024 인천 워터밤", "서울제즈 페스티벌", "산리오", "메가필드"];
  return (
    <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
      <Flex width={"100%"} justify="between" items="end" className="px-[4px]">
        <p className="text-p2B text-dark-950">최근 검색어</p>
        <Button
          label={"전체삭제"}
          variant="text"
          font="span1R"
          size={24}
          textColor="DARK_300"
          onClick={() =>
            alert({
              state: "error",
              text: "전체삭제 하시겠습니까?",
              handleOk: () => console.log("반응"),
            })
          }
        />
      </Flex>

      <Flex width={"100%"} gap={{ row: 8, column: 8 }} className="flex-wrap">
        {recent.map((item, i) => {
          return (
            <Flex
              key={i}
              items="center"
              gap={{ column: 8 }}
              className="h-[24px] min-w-[70px] bg-base-A px-[12px] rounded-full shadow-key"
              onClick={() => alert({ text: "넘어가기" })}
            >
              <span className="text-span1Rt text-dark-500">{item}</span>
              <Button
                size={12}
                variant="icon"
                label={<XLg size={8} className="fill-dark-300" />}
                onClick={(e) => {
                  e.stopPropagation();
                  alert({
                    state: "error",
                    text: "삭제 하시겠습니까?",
                  });
                }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

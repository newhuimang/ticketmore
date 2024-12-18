import useRecentSearches from "@/store/useSearch";
import useFeedback from "@/store/useFeedback";

import Button from "@/components/Button";
import Flex from "@/components/Flex";

import { XLg } from "react-bootstrap-icons";

export default function MobileRecentSearch() {
  const { recentSearches, removeSearch, clearSearches } = useRecentSearches();
  const { alert } = useFeedback();

  return (
    <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
      <Flex width={"100%"} justify="between" items="end" className="px-[4px]">
        <p className="text-subtitB text-primary-900">최근 검색어</p>
        {recentSearches.length > 0 && (
          <Button
            label={"전체삭제"}
            variant="text"
            font="p2R"
            size={24}
            textColor="DARK_300"
            onClick={() =>
              alert({
                state: "error",
                text: "전체삭제 하시겠습니까?",
                handleOk: clearSearches,
              })
            }
          />
        )}
      </Flex>

      <Flex width={"100%"} gap={{ row: 16, column: 16 }} className="flex-wrap">
        {recentSearches.map((item, i) => {
          return (
            <Flex
              key={i}
              items="center"
              gap={{ column: 16 }}
              className="h-[32px] min-w-[70px] bg-base-A px-[12px] rounded-full"
              onClick={() => alert({ text: "넘어가기" })}
            >
              <span className="text-p1Rt text-dark-500">{item}</span>
              <Button
                size={12}
                variant="icon"
                label={<XLg size={14} className="fill-dark-300" />}
                onClick={(e) => {
                  e.stopPropagation();
                  alert({
                    state: "error",
                    text: "삭제 하시겠습니까?",
                    handleOk: () => removeSearch(item),
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

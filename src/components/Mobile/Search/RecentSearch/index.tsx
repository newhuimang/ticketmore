import useRecentSearches from "@/store/useSearch";
import useFeedback from "@/store/useFeedback";

import Button from "@/components/Button";
import Flex from "@/components/Flex";

import { XLg } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function MobileRecentSearch() {
  const { recentSearches, removeSearch, clearSearches } = useRecentSearches();
  const navigate = useNavigate();
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

      <Flex width={"100%"} gap={{ row: 8, column: 16 }} className="flex-wrap">
        {recentSearches.map((item, i) => {
          return (
            <Flex
              key={i}
              items="center"
              gap={{ column: 16 }}
              className="h-[32px] min-w-[70px] max-w-full bg-base-A px-[12px] rounded-full"
              onClick={() =>
                navigate(`/search?result=${encodeURIComponent(item)}`)
              }
            >
              <span className="text-p1Rt text-dark-500 w-full truncate">
                {item}
              </span>
              <Button
                size={12}
                variant="icon"
                label={<XLg size={14} className="fill-dark-300" />}
                onClick={(e) => {
                  e.stopPropagation();
                  removeSearch(item);
                }}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

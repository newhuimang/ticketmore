import Flex from "@/components/Flex";
import MobilePromotion from "@/components/Mobile/Home/Promotion";
import Root from "@/components/Mobile/Home/Root";
import MobileTimeline from "@/components/Mobile/Home/Timeline";
import MobileWeeklyRank from "@/components/Mobile/Home/WeeklyRank";
import MobileNodataMessage from "@/components/NoData/Message";
import MobileTab from "@/components/Mobile/Tab";

import { Search } from "react-bootstrap-icons";
import MobileHeader from "@/components/Mobile/Header";
import { useMainTab } from "@/store/useMainTab";
import MobileFooter from "@/components/Mobile/Footer";

export default function MobileIntro() {
  const { setIsActive } = useMainTab();

  return (
    <>
      <MobileHeader />
      <Flex
        width={"100%"}
        direction="column"
        gap={{ row: 16 }}
        className="bg-base-B pt-[56px]"
      >
        <Flex
          width={"100%"}
          direction="column"
          gap={{ row: 16 }}
          className="pt-[12px] pb-[32px] bg-white shadow-key"
        >
          <Flex
            width={"calc(100% - 24px)"}
            items="center"
            className="relative mx-auto"
            onClick={() => setIsActive("search")}
          >
            <input
              placeholder="검색어를 입력하세요"
              className="w-full border border-primary-300 pl-[12px] h-[40px] rounded-[8px] focus:outline-none text-p1Rt placeholder:text-dark-300 placeholder:text-p1Rt"
            />

            <button
              className={`w-[24px] h-[24px] absolute flex justify-center items-center top-1/2 right-0 translate-x-[-8px] translate-y-[-50%]`}
            >
              <Search size={16} className="fill-primary-300" />
            </button>
          </Flex>

          <h3 className="text-subtitB text-primary-900 px-[12px]">
            👀 티켓모아에서 추천해드려요
          </h3>
          <MobilePromotion />
        </Flex>
        <Root>
          <h3 className="text-subtitB text-primary-900">주간 검색랭킹</h3>
          <MobileTab
            items={[
              { name: "공연", content: <MobileWeeklyRank /> },
              {
                name: "스포츠",
                content: <MobileNodataMessage msg="서비스 준비중입니다." />,
              },
              {
                name: "전시 · 관람",
                content: <MobileNodataMessage msg="서비스 준비중입니다." />,
              },
            ]}
          />
        </Root>
        <Root>
          <h3 className="text-subtitB text-primary-900">NEW 티켓오픈</h3>
          <MobileTimeline />
        </Root>
        <MobileFooter />
      </Flex>
    </>
  );
}

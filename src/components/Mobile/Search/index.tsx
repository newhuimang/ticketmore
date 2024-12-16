import MobileRecentSearch from "./RecentSearch";
import MobilePopularSearch from "./PopularSearch";

import Flex from "@/components/Flex";
import MobileSearchbar from "./Searchbar";
import MobileNavBar from "../NavBar";

export default function MobileSearch() {
  return (
    <>
      <MobileNavBar title="검색" />
      <Flex width={"100%"} direction="column" gap={{ row: 16 }} className="mt-[40px] bg-white">
        <Flex width={"100%"} direction="column" gap={{ row: 24 }} className="px-[12px]">
          <MobileSearchbar />

          <MobileRecentSearch />
        </Flex>

        <Flex
          width={"100%"}
          justify="center"
          className={`px-[12px] py-[14px] h-fit bg-gradient-to-br from-[#00467F] to-[#A5CC82]`}
        >
          <Flex
            width={"100%"}
            direction="column"
            gap={{ row: 3 }}
            className="relative max-w-[320px]"
          >
            <Flex gap={{ column: 4 }}>
              <Flex className="text-white">
                <span className="text-span1B text-nowrap shadow-basic">설문조사</span>
                <span className="text-span1R text-nowrap shadow-basic">만 참여해도</span>
              </Flex>
              <Flex gap={{ column: 2 }} className="text-white">
                <span className="text-span1R shadow-basic">스타벅스</span>
                <span className="text-span1B shadow-basic">기프티콘</span>
                <span className="text-span1R shadow-basic">증정!</span>
              </Flex>
            </Flex>

            <Flex width="w-[80%]" justify="center" gap={{ column: 8 }}>
              <Flex width="w-fit" gap={{ column: 4 }} className="text-white">
                <div className="text-span2B text-nowrap shadow-basic">설문기한</div>
                <div className="text-span2R text-nowrap shadow-basic"> ~ 추후 공지 예정</div>
              </Flex>
              <Flex width="w-fit" gap={{ column: 4 }} className="text-white">
                <div className="text-span2B text-nowrap shadow-basic">당첨자 안내</div>
                <div className="text-span2R text-nowrap shadow-basic">개별연락</div>
              </Flex>
            </Flex>

            <div
              className="absolute top-1/2 right-0 translate-x-[-50%] translate-y-[-50%] bg-cover bg-no-repeat w-[13%] h-0 pt-[13%] shadow-basic"
              style={{ backgroundImage: `url('/assets/starbucks.png')` }}
            />
          </Flex>
        </Flex>

        <Flex width={"100%"} className="px-[12px]">
          <MobilePopularSearch />
        </Flex>
      </Flex>
    </>
  );
}

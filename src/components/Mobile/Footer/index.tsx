import Divider from "@/components/Divider";
import Flex from "@/components/Flex";
import { Link } from "react-router-dom";

export default function MobileFooter() {
  return (
    <>
      <Flex width={"100%"} className={`px-[12px] py-[16px]`}>
        <Flex direction="column" gap={{ row: 16 }}>
          <Flex width="fit" direction="column" gap={{ row: 4 }}>
            <div className="text-span2B text-dark-500">(주)티켓모아</div>
            <div className="text-span2R text-dark-300">
              서울 특별시 강남구 역삼로 777, gN타워 7층
            </div>
            <Flex items="center" gap={{ column: 4 }}>
              <div className="text-span2R text-dark-300">사업자등록번호</div>
              <Divider type="vertical" height={6} color="bg-dark-200" />
              <div className="text-span2R text-dark-300">908-76-54321</div>
            </Flex>
            <Flex items="center" gap={{ column: 4 }}>
              <div className="text-span2R text-dark-300">대표이사</div>
              <Divider type="vertical" height={6} color="bg-dark-200" />
              <div className="text-span2R text-dark-300">차주미</div>
            </Flex>
          </Flex>

          <Flex gap={{ column: 32 }}>
            <Flex width="fit" gap={{ column: 4 }}>
              <div className="text-span2B text-dark-300">고객센터</div>
              <Flex width="fit" direction="column" gap={{ row: 4 }}>
                <Flex width="fit" direction="column">
                  <div className="text-span2R text-dark-300">
                    1544 - 1234 (유료)
                  </div>
                  <div className="text-span2R text-dark-300">
                    평일/주말 09:00 - 18:00
                  </div>
                </Flex>
                <div className="text-span2R text-dark-300">1 : 1 문의</div>
              </Flex>
            </Flex>

            <Flex width="fit" gap={{ column: 4 }}>
              <Flex
                direction="column"
                gap={{ row: 4 }}
                className="text-dark-300 text-span2B"
              >
                <div>이메일</div>
                <div>팩스번호</div>
              </Flex>
              <Flex
                width="fit"
                direction="column"
                gap={{ row: 4 }}
                className="text-span2R text-dark-300"
              >
                <Link to="mailto:ticketmore.official@gmail.com">
                  ticketmore.official@gmail.com
                </Link>
                <div>0504-1234-5678</div>
              </Flex>
            </Flex>
          </Flex>

          <Flex items="center" gap={{ column: 4 }}>
            <div className="text-span2R text-dark-300">이용약관</div>
            <Divider type="vertical" height={6} color="bg-dark-200" />
            <div className="text-dark-300 text-span2B">개인정보방침</div>
            <Divider type="vertical" height={6} color="bg-dark-200" />
            <div className="text-span2R text-dark-300">청소년보호정책</div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

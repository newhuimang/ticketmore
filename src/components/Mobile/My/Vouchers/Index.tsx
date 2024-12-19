import useAuth from "@/store/useAuth";
import useOverlay from "@/store/useOverlay";

import Flex from "@/components/Flex";
import MobileRoot from "@/components/Root/Mobile";

import {
  ChevronRight,
  GiftFill,
  Server,
  StarFill,
} from "react-bootstrap-icons";
import MobileLogin from "@/pages/Mobile/Login";
import MyHistory from "./MyHistory";

export default function MobileMyInfo({ data }: { data: any }) {
  const { auth, isLoggedIn } = useAuth();
  const { openOverlay } = useOverlay();
  return (
    <MobileRoot className={`bg-gradient-to-br from-[#A7CCF7] to-[#787CFD]`}>
      {/* 이름 영역 */}
      <Flex width={"100%"} justify="between" items="center">
        {isLoggedIn ? (
          <>
            <Flex gap={{ column: 4 }} className="px-[4px]">
              <p className="text-p1B text-primary-100">Ticket</p>
              <p className="text-p1R text-primary-100">More</p>
            </Flex>

            {auth && (
              <Flex items="end" gap={{ column: 4 }} className="px-[4px]">
                <p className="text-str2B text-white">{auth.id}</p>
                <p className="text-str2R text-white">님</p>
              </Flex>
            )}
          </>
        ) : (
          <>
            <Flex
              width={"100%"}
              items="end"
              gap={{ column: 4 }}
              className="px-[4px] text-white"
            >
              <p className="text-str2B">로그인</p>
              <p className="tex-p1R">이 필요한 서비스입니다</p>
            </Flex>
            <ChevronRight
              size={22}
              className="fill-white"
              onClick={() => openOverlay(<MobileLogin />)}
            />
          </>
        )}
      </Flex>

      <Flex
        width={"100%"}
        direction="column"
        gap={{ row: 16 }}
        className={`${!isLoggedIn && "filter blur-sm"}`}
      >
        <Flex
          width={"100%"}
          justify="between"
          items="center"
          className="px-[12px] py-[16px] bg-white shadow-basic rounded-[12px]"
        >
          {/* 포인트 */}
          <Flex items="center" gap={{ column: 4 }}>
            <Server size={16} className="fill-primary-300" />
            <p className="text-p1R text-primary-700">포인트</p>
          </Flex>

          <Flex items="end" gap={{ column: 4 }} className="text-primary-700">
            <p
              className="text-p1B underline"
              onClick={() => {
                if (isLoggedIn) {
                  openOverlay(<MyHistory type="point" data={data?.points} />);
                }
              }}
            >
              {isLoggedIn ? data?.points.totalCount : "???"}
            </p>
            <span className="text-p2R">P</span>
          </Flex>
        </Flex>

        <Flex width={"100%"} gap={{ column: 16 }}>
          <Flex
            width={"50%"}
            justify="between"
            items="center"
            className="px-[12px] py-[16px] bg-white shadow-basic rounded-[12px]"
          >
            <Flex items="center" gap={{ column: 4 }}>
              <Flex
                width={16}
                items="center"
                justify="center"
                className="h-[16px] bg-primary-300 rounded-full"
              >
                <StarFill size={10} className="fill-primary-100" />
              </Flex>
              <p className="text-p1R text-primary-700">쿠폰</p>
            </Flex>

            <p
              className="text-p1B text-primary-700 underline"
              onClick={() => {
                if (isLoggedIn) {
                  openOverlay(<MyHistory type="coupon" data={data?.coupons} />);
                }
              }}
            >
              {data?.coupons ? data.coupons.totalCount : 0}
            </p>
          </Flex>

          <Flex
            width={"50%"}
            justify="between"
            items="center"
            className="px-[12px] py-[16px] bg-white shadow-basic rounded-[12px]"
          >
            <Flex items="center" gap={{ column: 4 }}>
              <GiftFill size={16} className="fill-primary-300" />
              <p className="text-p1R text-primary-700">구매권</p>
            </Flex>

            <p
              className="text-p1B text-primary-700 underline"
              onClick={() => {
                if (isLoggedIn) {
                  openOverlay(<MyHistory type="gifts" data={data?.gifts} />);
                }
              }}
            >
              {data?.gifts ? data.gifts.totalCount : 0}
            </p>
          </Flex>
        </Flex>
      </Flex>
    </MobileRoot>
  );
}

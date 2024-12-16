import useAuth from "@/store/useAuth";

import Flex from "@/components/Flex";
import MobileRoot from "@/components/Root/Mobile";

import { ChevronRight, GiftFill, Server, StarFill } from "react-bootstrap-icons";
import useOverlay from "@/store/useOverlay";
import MobileLogin from "@/pages/Mobile/Login";
import MyHistory from "./MyHistory";

import { useEffect, useState } from "react";
import { UserMyInfo } from "@/type/type";

export default function MobileMyInfo() {
  const [user, setUser] = useState<UserMyInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { auth, isLoggedIn } = useAuth();
  const { openOverlay } = useOverlay();

  useEffect(() => {
    const fetchUserData = async (): Promise<UserMyInfo> => {
      try {
        const response = await fetch("/data/user.json");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserMyInfo = await response.json();
        setUser(data);
        setLoading(false);
        return data;
      } catch (error) {
        setError("Failed to get user data.");
        setLoading(false);
        throw new Error("Failed to get user");
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MobileRoot className={`bg-gradient-to-br from-[#A7CCF7] to-[#787CFD]`}>
      {/* 이름 영역 */}
      <Flex width={"100%"} justify="between" items="center">
        {isLoggedIn ? (
          <>
            <Flex gap={{ column: 4 }} className="px-[4px]">
              <p className="text-p2B text-primary-100">Ticket</p>
              <p className="text-p2R text-primary-100">More</p>
            </Flex>

            {auth && (
              <Flex items="end" gap={{ column: 4 }} className="px-[4px]">
                <p className="text-p1B text-white">{auth.id}</p>
                <p className="text-p2R text-white">님</p>
              </Flex>
            )}
          </>
        ) : (
          <>
            <Flex width={"100%"} items="end" gap={{ column: 4 }} className="px-[4px] text-white">
              <p className="text-p1B">로그인</p>
              <p className="text-p2R">이 필요한 서비스입니다</p>
            </Flex>
            <ChevronRight
              size={16}
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
          className="px-[12px] py-[8px] bg-white shadow-basic rounded-[12px]"
        >
          {/* 포인트 */}
          <Flex items="center" gap={{ column: 4 }}>
            <Server size={12} className="fill-primary-300" />
            <p className="text-p2R text-primary-700">포인트</p>
          </Flex>

          <Flex items="end" gap={{ column: 4 }} className="text-primary-700">
            <p
              className="text-p2B underline"
              onClick={() => openOverlay(<MyHistory type="point" data={user && user.points} />)}
            >
              {isLoggedIn ? user?.points.totalCount : "???"}
            </p>
            <span className="text-span2R">P</span>
          </Flex>
        </Flex>

        <Flex width={"100%"} gap={{ column: 8 }}>
          <Flex
            width={"50%"}
            justify="between"
            items="center"
            className="px-[12px] py-[8px] bg-white shadow-basic rounded-[12px]"
          >
            <Flex items="center" gap={{ column: 4 }}>
              <Flex
                width={12}
                items="center"
                justify="center"
                className="h-[12px] bg-primary-300 rounded-full"
              >
                <StarFill size={6} className="fill-primary-100" />
              </Flex>
              <p className="text-p2R text-primary-700">쿠폰</p>
            </Flex>

            <p
              className="text-p2B text-primary-700 underline"
              onClick={() => openOverlay(<MyHistory type="coupon" data={user?.coupons} />)}
            >
              {user ? user.coupons.totalCount : 0}
            </p>
          </Flex>

          <Flex
            width={"50%"}
            justify="between"
            items="center"
            className="px-[12px] py-[8px] bg-white shadow-basic rounded-[12px]"
          >
            <Flex items="center" gap={{ column: 4 }}>
              <GiftFill size={12} className="fill-primary-300" />
              <p className="text-p2R text-primary-700">구매권</p>
            </Flex>

            <p
              className="text-p2B text-primary-700 underline"
              onClick={() => openOverlay(<MyHistory type="gifts" data={user?.gifts} />)}
            >
              {user ? user.gifts.totalCount : 0}
            </p>
          </Flex>
        </Flex>
      </Flex>
    </MobileRoot>
  );
}

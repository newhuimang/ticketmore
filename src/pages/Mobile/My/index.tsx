import { useEffect, useState } from "react";

import useAuth from "@/store/useAuth";
import useFeedback from "@/store/useFeedback";
import useOverlay from "@/store/useOverlay";

import MobileFooter from "@/components/Mobile/Footer";
import MobileNavBar from "@/components/Mobile/NavBar";
import MobileMyInfo from "@/components/Mobile/My/Vouchers/Index";
import MobileMyBooking from "./myBooking";

import MobileMyContainer from "@/components/Mobile/My/MyContainer";
import Flex from "@/components/Flex";
import Divider from "@/components/Divider";

import {
  BoxArrowRight,
  Cart2,
  CashCoin,
  Coin,
  CreditCard,
  DoorOpen,
  Headset,
  Phone,
  QuestionCircle,
  TicketPerforated,
} from "react-bootstrap-icons";

import { UserMyInfo } from "@/type/type";

export default function MobileMy({}: {}) {
  const [user, setUser] = useState<UserMyInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoggedIn, logout } = useAuth();
  const feedbacck = useFeedback();
  const { openOverlay } = useOverlay();

  useEffect(() => {
    if (isLoggedIn) {
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
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [isLoggedIn]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <MobileNavBar title="마이" />
      <Flex width={"100%"} direction="column">
        <Flex
          width={"100%"}
          direction="column"
          gap={{ row: 24 }}
          className="mt-[52px] pb-[16px] bg-base-A"
        >
          <MobileMyInfo data={user} />

          <Flex width={"100%"} direction="column" gap={{ row: 32 }}>
            <MobileMyContainer
              label="예매내역"
              list={[
                {
                  id: "history",
                  title: "예매/예매취소",
                  icon: (
                    <TicketPerforated size={16} className="fill-dark-500" />
                  ),
                  onClick: () => {
                    if (isLoggedIn) {
                      openOverlay(
                        <MobileMyBooking id="history" data={user?.bookings} />
                      );
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
                {
                  id: "waiting",
                  title: "예매대기",
                  icon: <Cart2 size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      // openOverlay(<MobileMyBooking id="history" data={user?.bookings} />)
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
                {
                  id: "mo-ticket",
                  title: "모바일티켓",
                  icon: <Phone size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      // openOverlay(<MobileMyBooking id="history" data={user?.bookings} />)
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
              ]}
            />
            <MobileMyContainer
              label="결제페이"
              list={[
                {
                  id: "card",
                  title: "카드",
                  icon: <CreditCard size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      feedbacck.toast({ text: "서비스 준비중입니다." });
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
                {
                  id: "account",
                  title: "결제계좌",
                  icon: <Coin size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      feedbacck.toast({ text: "서비스 준비중입니다." });
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
                {
                  id: "refund",
                  title: "환불계좌",
                  icon: <CashCoin size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      feedbacck.toast({ text: "서비스 준비중입니다." });
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
              ]}
            />
            <MobileMyContainer
              label="고객센터"
              list={[
                {
                  id: "contact",
                  title: "1 : 1 문의",
                  icon: <Headset size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      // openOverlay(<MobileMyBooking id="history" data={user?.bookings} />)
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
                {
                  id: "faq",
                  title: "FAQ",
                  icon: <QuestionCircle size={16} className="fill-dark-500" />,
                  onClick: () => {
                    if (isLoggedIn) {
                      // openOverlay(<MobileMyBooking id="history" data={user?.bookings} />)
                    } else {
                      feedbacck.toast({ text: "로그인 후 이용가능합니다." });
                    }
                  },
                },
              ]}
            />
            <Flex width={"100%"} className="px-[12px] mt-[12px]">
              <Flex
                width={"100%"}
                direction="column"
                className="px-[12px] shadow-basic bg-white rounded-[12px]"
              >
                {/* 로그아웃 */}
                <Flex
                  items="center"
                  gap={{ column: 8 }}
                  className="py-[12px]"
                  onClick={() => {
                    logout();
                    window.scrollTo(0, 0);
                  }}
                >
                  <BoxArrowRight size={16} className="fill-dark-500" />
                  <p className="text-p1R">로그아웃</p>
                </Flex>

                <Divider color="bg-base-A" />

                {/* 회원탈퇴 */}
                <Flex
                  items="center"
                  gap={{ column: 8 }}
                  className="py-[12px]"
                  onClick={() => {
                    feedbacck.toast({
                      text: "서비스 준비중입니다.",
                    });
                  }}
                >
                  <DoorOpen size={16} className="fill-dark-500" />
                  <p className="text-p1R">회원탈퇴</p>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <MobileFooter />
      </Flex>
    </>
  );
}

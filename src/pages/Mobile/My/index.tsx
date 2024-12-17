import useAuth from "@/store/useAuth";
import useFeedback from "@/store/useFeedback";

import MobileFooter from "@/components/Mobile/Footer";

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
import MobileNavBar from "@/components/Mobile/NavBar";
import MobileMyInfo from "@/components/Mobile/My/Vouchers/Index";
import MobileMyContainer from "@/components/Mobile/My/MyContainer";
import MobileMyBooking from "./booking";

export default function MobileMy({}: {}) {
  const { logout } = useAuth();
  const feedbacck = useFeedback();

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
          <MobileMyInfo />

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
                  contents: <MobileMyBooking />,
                },
                {
                  id: "waiting",
                  title: "예매대기",
                  icon: <Cart2 size={16} className="fill-dark-500" />,
                  contents: <>ㅇ</>,
                },
                {
                  id: "mo-ticket",
                  title: "모바일티켓",
                  icon: <Phone size={16} className="fill-dark-500" />,
                  contents: <>ㅇ</>,
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
                },
                {
                  id: "account",
                  title: "결제계좌",
                  icon: <Coin size={16} className="fill-dark-500" />,
                },
                {
                  id: "refund",
                  title: "환불계좌",
                  icon: <CashCoin size={16} className="fill-dark-500" />,
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
                },
                {
                  id: "faq",
                  title: "FAQ",
                  icon: <QuestionCircle size={16} className="fill-dark-500" />,
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
                <Flex items="center" gap={{ column: 8 }} className="py-[12px]">
                  <BoxArrowRight size={16} className="fill-dark-500" />
                  <p
                    onClick={() => {
                      logout();
                      window.scrollTo(0, 0);
                    }}
                    className="text-p1R"
                  >
                    로그아웃
                  </p>
                </Flex>

                <Divider color="bg-base-A" />

                {/* 회원탈퇴 */}
                <Flex items="center" gap={{ column: 8 }} className="py-[12px]">
                  <DoorOpen size={16} className="fill-dark-500" />
                  <p
                    onClick={() => {
                      feedbacck.toast({
                        text: "서비스 준비중입니다.",
                      });
                    }}
                    className="text-p1R"
                  >
                    회원탈퇴
                  </p>
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

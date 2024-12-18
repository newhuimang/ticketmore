import { Link } from "react-router-dom";
import Button from "@/components/Button";
import Flex from "@/components/Flex";
import useOverlay from "@/store/useOverlay";
import MobileLogin from "@/pages/Mobile/Login";
import useAuth from "@/store/useAuth";
import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import { useMainTab } from "@/store/useMainTab";

export default function MobileHeader() {
  const { auth, isLoggedIn, logout } = useAuth();
  const { setIsActive } = useMainTab();
  const { openOverlay } = useOverlay();
  const [headerStyle, setHeaderStyle] = useState<number>(0);

  const updateScroll = () => {
    setHeaderStyle(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <Flex
      width={"100%"}
      items="center"
      justify="between"
      gap={{ column: 16 }}
      className={`fixed z-10 bg-white p-[12px] ${headerStyle > 10 ? "border-b border-primary-100 shadow-key" : "border-none"}`}
    >
      <h1 className=" text-dark-950">
        <Link
          to={"/"}
          className="flex gap-x-[4px]"
          onClick={() => setIsActive("home")}
        >
          <span className="text-str2B">Ticket</span>
          <span className="text-str2R">More</span>
        </Link>
      </h1>
      {isLoggedIn ? (
        auth && (
          <Dropdown
            height={32}
            menu={[
              {
                title: (
                  <Flex items="center" gap={{ column: 4 }}>
                    <span className="text-p1B text-primary-900">{auth.id}</span>
                    <span className="text-p1R text-dark-500">님</span>
                  </Flex>
                ),
                list: [
                  {
                    content: (
                      <Link to={"/"}>
                        <span onClick={() => setIsActive("my")}>
                          마이페이지
                        </span>
                      </Link>
                    ),
                  },
                  {
                    content: <span onClick={logout}>로그아웃</span>,
                  },
                ],
              },
            ]}
          />
        )
      ) : (
        <Button
          variant="text"
          label="로그인"
          font="p2R"
          size={32}
          onClick={() => {
            openOverlay(<MobileLogin />);
          }}
        />
      )}
    </Flex>
  );
}

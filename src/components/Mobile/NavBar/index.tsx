import Flex from "@/components/Flex";
import { useEffect, useState } from "react";
import { Share } from "react-bootstrap-icons";

export default function MobileNavBar({
  icon,
  title,
  onClick,
  share = false,
}: {
  icon?: React.ReactNode;
  title?: string;
  onClick?: (id: any) => void;
  share?: boolean;
}) {
  const [headerStyle, setHeaderStyle] = useState<number>(0);

  const updateScroll = () => {
    setHeaderStyle(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <Flex
      width="100vw"
      justify="center"
      items="center"
      className={`fixed h-[52px] bg-[#ffffff70] backdrop-blur-[100px] z-10 box-border ${headerStyle > 52 ? "shadow-key border-b border-primary-100" : ""}`}
    >
      {icon && (
        <Flex
          width="32px"
          justify="center"
          items="center"
          className="absolute h-[32px] top-1/2 translate-y-[-50%] left-[6px]"
          onClick={onClick}
        >
          {icon}
        </Flex>
      )}
      {title && <p className="text-p1B text-primary-900">{title}</p>}
      {share && (
        <Flex
          width="32px"
          justify="center"
          items="center"
          className="absolute h-[32px] top-1/2 translate-y-[-50%] right-[6px]"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  url: window.location.href,
                })
                .then(() => {
                  console.log("URL 공유 성공");
                })
                .catch((error) => {
                  console.error("URL 공유 실패", error);
                });
            } else {
              alert("이 브라우저는 Web Share API를 지원하지 않습니다.");
            }
          }}
        >
          <Share size={16} className="fill-dark" />
        </Flex>
      )}
    </Flex>
  );
}

import { useState, useEffect } from "react";

export default function useDevice() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // 767px 이하일 때 모바일
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

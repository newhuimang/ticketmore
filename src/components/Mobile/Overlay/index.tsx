import { useEffect } from "react";
import useOverlay, { useLatestOverlay } from "@/store/useOverlay";

import Flex from "@/components/Flex";
import MobileNavBar from "../NavBar";

import { ArrowLeft } from "react-bootstrap-icons";

import { OverlayHeadProps } from "./IOverlay";

function OverlayHead({
  size = 24,
  className = "fill-primary-900",
  title,
  share,
}: OverlayHeadProps) {
  const { closeOverlay } = useOverlay();
  return (
    <MobileNavBar
      icon={<ArrowLeft className={className} size={size} />}
      title={title}
      onClick={closeOverlay}
      share={share}
    />
  );
}

function OverlayBody({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      width="100%"
      className="bg-white box-border mt-[40px] h-[calc(100%-124px)]"
    >
      {children}
    </Flex>
  );
}

function OverlayControl({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      width="100%"
      gap={{ column: 8 }}
      className="fixed bottom-0 bg-white box-border z-50 p-[12px]"
    >
      {children}
    </Flex>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  const { isOpen } = useLatestOverlay();

  // open 시 background scroll 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 1);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Flex
      width="100%"
      className="bg-white fixed top-0 left-0 overflow-y-scroll h-safari box-border z-10"
    >
      {children}
    </Flex>
  );
}

export default Overlay;
Overlay.Head = OverlayHead;
Overlay.Body = OverlayBody;
Overlay.Control = OverlayControl;

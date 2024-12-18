import useOverlay, { useLatestOverlay } from "@/store/useOverlay";

import Flex from "@/components/Flex";
import MobileNavBar from "../NavBar";

import { ArrowLeft } from "react-bootstrap-icons";

import { OverlayHeadProps } from "./IOverlay";
import { useEffect } from "react";

function OverlayHead({
  size = 24,
  className = "fill-primary-900",
  title,
}: OverlayHeadProps) {
  const { closeOverlay } = useOverlay();
  return (
    <MobileNavBar
      icon={<ArrowLeft className={className} size={size} />}
      title={title}
      onClick={closeOverlay}
    />
  );
}

function OverlayBody({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      width="100%"
      className="bg-white box-border mt-[40px] h-[calc(100%-114px)]"
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
      className="absolute bottom-0 bg-white box-border p-[12px]"
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
      document.body.style.position = "fixed";
      document.body.style.top = "0";
      document.body.style.left = "0";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "auto";
      document.body.style.overflow = "auto";
    }

    // Cleanup
    return () => {
      document.body.style.position = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Flex
      width="100%"
      className="bg-white fixed top-0 left-0 overflow-y-scroll h-screen box-border z-10"
    >
      {children}
    </Flex>
  );
}

export default Overlay;
Overlay.Head = OverlayHead;
Overlay.Body = OverlayBody;
Overlay.Control = OverlayControl;

import { createContext, useContext, useState } from "react";
import { OverlayContextType } from "@/components/Mobile/Overlay/IOverlay";

export const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [overlays, setOverlays] = useState<{ isOpen: boolean; content: React.ReactNode | null }[]>(
    []
  );

  // 새로운 오버레이를 열 때 스택에 추가
  const openOverlay = (newContent: React.ReactNode) => {
    setOverlays((prev) => [...prev, { isOpen: true, content: newContent }]);
  };

  // 가장 마지막 오버레이를 닫을 때
  const closeOverlay = () => {
    setOverlays((prev) => {
      if (prev.length > 0) {
        return prev.slice(0, -1); // 가장 마지막 오버레이만 닫기
      }
      return prev;
    });
  };

  return (
    <OverlayContext.Provider value={{ overlays, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
}

export default function useOverlay(): OverlayContextType {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}

export function useLatestOverlay() {
  const { overlays } = useOverlay();
  const latestOverlay = overlays[overlays.length - 1];

  const { isOpen, content } = latestOverlay || { isOpen: false, content: null };

  return { isOpen, content };
}

interface OverlayHeadProps {
  size?: string | number;
  className?: string;
  title?: string;
  share?: boolean;
}

interface OverlayContextType {
  overlays: { isOpen: boolean; content: React.ReactNode | null }[];
  openOverlay: (content: React.ReactNode) => void;
  closeOverlay: () => void;
}

export type { OverlayHeadProps, OverlayContextType };

import Modal from "@/components/Modal";
import { ModalContextType, ModalOptions, ModalType } from "@/components/Modal/IModal";
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const setOpenModal = (type: ModalType | null, options: ModalOptions | null = null) => {
    setModalType(type);
    setModalOptions(options);
  };

  return (
    <ModalContext.Provider value={{ type: modalType, modalOptions, setOpenModal }}>
      {children}
      <Modal />
    </ModalContext.Provider>
  );
}
export default function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

type ModalType = "Login" | "Form" | "Modal";

interface ModalOptions {
  header: {
    title?: string;
    close?: () => void;
  };
  body: {
    children: React.ReactNode;
  };
  control: {
    okText?: string;
    handleOk?: () => void;
    cancelText?: string;
    handleCancel?: () => void;
  };
}

interface ModalContextType {
  type: ModalType | null;
  modalOptions: ModalOptions | null;
  setOpenModal: (name: ModalType | null) => void;
}
export type { ModalContextType, ModalOptions, ModalType };

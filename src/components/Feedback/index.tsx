import { useEffect } from "react";

import Alert, { MobileAlert } from "./components/Alert";
import Flex from "@/components/Flex";

import { FeedbackMessageProps } from "./iFeedback";
import useDevice from "@/store/useDevice";

export default function FeedbackMessage({
  message,
  setMessage,
}: FeedbackMessageProps) {
  if (!message) return null;
  const { options } = message;
  const isMobile = useDevice();

  const onOk = (e: any) => {
    if (options.handleOk) {
      options.handleOk(e);
    }
    setMessage(null);
  };
  const onCancel = () => {
    if (options.handleCancel) {
      options.handleCancel();
    }
    setMessage(null);
  };

  useEffect(() => {
    if (message.type === "toast") {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  switch (message.type) {
    case "alert":
      return isMobile ? (
        <MobileAlert options={options} onCancel={onCancel} onOk={onOk} />
      ) : (
        <Alert options={options} onCancel={onCancel} onOk={onOk} />
      );
    case "toast":
      return (
        <div
          onClick={onCancel}
          className="fixed top-0 left-0 w-screen h-screen z-50"
        >
          <Flex
            width="fit-content"
            className="absolute z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-[24px] py-[12px] bg-[#18193395] text-white backdrop-blur-[20px] rounded-[16px] shadow-feedback"
          >
            <p className="text-p1R">{options.text}</p>
          </Flex>
        </div>
      );
    default:
      return null;
  }
}

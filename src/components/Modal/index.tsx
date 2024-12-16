import { useEffect, useState } from "react";
import useModal from "@/store/useModal";
import Login from "./components/Login";
import Flex from "../Flex";
import { XLg } from "react-bootstrap-icons";
import useFeedback from "@/store/useFeedback";

export default function Modal() {
  const { type, setOpenModal } = useModal();
  const [error, setError] = useState<string | null>(null);
  const feedback = useFeedback();

  useEffect(() => {
    if (error) {
      feedback.toast({ text: error });
    }
  }, [error, feedback]);

  if (!type) return null;

  const renderModal = () => {
    switch (type) {
      case "Login":
        return <Login close={() => setOpenModal(null)} />;
      case "Form":
        return <></>;
      case "Modal":
        return <></>;
      default:
        setError("System err.");
        return null;
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-[#00000060]">
      <Flex
        width={380}
        direction="column"
        className="max-w-[40vw] absolute z-50 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] px-[16px] py-[16px] bg-white rounded-[16px] h-[80vh]"
      >
        <Flex width={"100%"} items="center" justify="between">
          <p className="text-str1R text-primary-900"></p>
          <button
            onClick={() => setOpenModal(null)}
            className="rounded-[4px] ml-auto hover:bg-dark-50 w-[24px] h-[24px] flex justify-center items-center"
          >
            <XLg size={16} className="fill-dark-500" />
          </button>
        </Flex>
        {renderModal()}
      </Flex>
    </div>
  );
}

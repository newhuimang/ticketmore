import Flex from "@/components/Flex";
import { FeedbackOptions } from "../iFeedback";
import Divider from "@/components/Divider";
import {
  BellFill,
  ExclamationCircleFill,
  InfoCircleFill,
} from "react-bootstrap-icons";
import Button from "@/components/Button";

export default function Alert({
  options,
  onOk,
  onCancel,
}: {
  options: FeedbackOptions;
  onOk: () => void;
  onCancel: () => void;
}) {
  switch (options.state) {
    case "primary":
      return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
          <Flex
            direction="column"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[280px] max-w-[30vw] bg-white shadow-feedback rounded-[16px] overflow-hidden"
          >
            <Flex width={"100%"} className="bg-primary px-[16px] py-[10px]">
              <InfoCircleFill size={16} className="fill-white" />
            </Flex>
            <Flex
              width={"100%"}
              direction="column"
              gap={{ row: 16 }}
              className="p-[16px] pb-[8px]"
            >
              <p className="text-p1R py-[4px]">{options.text}</p>
              <Divider color="bg-primary-100" />
              <Flex width={"100%"} justify="end" gap={{ column: 8 }}>
                <button
                  className="flex items-center text-p2R text-dark-500 px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]"
                  onClick={onCancel}
                >
                  {options.cancelText || "취소"}
                </button>
                <button
                  className="flex items-center text-p2B text-primary px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]"
                  onClick={onOk}
                >
                  {options.okText || "확인"}
                </button>
              </Flex>
            </Flex>
          </Flex>
        </div>
      );
    case "error":
      return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
          <Flex
            direction="column"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[280px] max-w-[30vw] bg-white shadow-feedback rounded-[16px] overflow-hidden"
          >
            <Flex width={"100%"} className="bg-state-R px-[16px] py-[10px]">
              <ExclamationCircleFill size={16} className="fill-white" />
            </Flex>
            <Flex
              width={"100%"}
              direction="column"
              gap={{ row: 16 }}
              className="p-[16px] pb-[8px]"
            >
              <p className="text-p1R py-[4px]">{options.text}</p>
              <Divider color="bg-dark-100" />
              <Flex width={"100%"} justify="end" gap={{ column: 8 }}>
                <button
                  className="flex items-center text-p2R text-dark-500 px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]"
                  onClick={onCancel}
                >
                  {options.cancelText || "취소"}
                </button>
                <button
                  className="flex items-center text-p2B text-state-R px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]"
                  onClick={onOk}
                >
                  {options.okText || "확인"}
                </button>
              </Flex>
            </Flex>
          </Flex>
        </div>
      );
    case "default":
      return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
          <Flex
            direction="column"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-[280px] max-w-[30vw] bg-white shadow-feedback rounded-[16px] overflow-hidden"
          >
            <Flex width={"100%"} className="bg-dark-300 px-[16px] py-[10px]">
              <BellFill size={16} className="fill-white" />
            </Flex>
            <Flex
              width={"100%"}
              direction="column"
              gap={{ row: 16 }}
              className="p-[16px] pb-[8px]"
            >
              <p className="text-p1R py-[4px]">{options.text}</p>
              <Divider color="bg-dark-100" />
              <Flex width={"100%"} justify="end" gap={{ column: 8 }}>
                <button
                  className="flex items-center text-p2R text-dark-500 px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]"
                  onClick={onCancel}
                >
                  {options.cancelText || "취소"}
                </button>
                <button
                  className="flex items-center text-p2B text-dark-500 px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]"
                  onClick={onOk}
                >
                  {options.okText || "확인"}
                </button>
              </Flex>
            </Flex>
          </Flex>
        </div>
      );
  }
}

export function MobileAlert({
  options,
  onOk,
  onCancel,
}: {
  options: FeedbackOptions;
  onOk: () => void;
  onCancel: () => void;
}) {
  switch (options.state) {
    case "primary":
      return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
          <Flex
            width={"60vw"}
            direction="column"
            className="absolute bg-white top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-feedback rounded-[16px] overflow-hidden"
          >
            <Flex width={"100%"} justify="center" className="pt-[8px]">
              <ExclamationCircleFill size={16} className="fill-primary" />
            </Flex>
            <Flex width={"100%"} direction="column">
              <Flex
                width={"100%"}
                justify="center"
                className="px-[12px] py-[24px]"
              >
                <p className="text-p2R text-dark">{options.text}</p>
              </Flex>
              <Flex width={"100%"}>
                <div className="w-[50%] flex justify-center bg-base-A">
                  <Button
                    width={"50%"}
                    font="span1R"
                    bgColor="BASE_A"
                    textColor="DARK_500"
                    size={32}
                    label={options.cancelText || "취소"}
                    onClick={onCancel}
                  />
                </div>
                <div className="w-[50%] flex justify-center bg-primary">
                  <Button
                    width={"100%"}
                    font="span1B"
                    size={32}
                    label={options.okText || "확인"}
                    onClick={onOk}
                  />
                </div>
              </Flex>
            </Flex>
          </Flex>
        </div>
      );
    case "error":
      return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
          <Flex
            width={"60vw"}
            direction="column"
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-feedback rounded-[16px] overflow-hidden bg-white"
          >
            <Flex width={"100%"} justify="center" className="pt-[8px]">
              <ExclamationCircleFill size={16} className="fill-state-R" />
            </Flex>
            <Flex width={"100%"} direction="column">
              <Flex
                width={"100%"}
                justify="center"
                className="px-[12px] py-[24px]"
              >
                <p className="text-p2R text-dark">{options.text}</p>
              </Flex>
              <Flex width={"100%"}>
                <div className="w-[50%] flex justify-center bg-base-A">
                  <Button
                    width={"50%"}
                    font="span1R"
                    bgColor="BASE_A"
                    textColor="DARK_500"
                    size={32}
                    label={options.cancelText || "취소"}
                    onClick={onCancel}
                  />
                </div>
                <div className="w-[50%] flex justify-center bg-state-R">
                  <Button
                    width={"100%"}
                    font="span1B"
                    bgColor="STATE_R"
                    size={32}
                    label={options.okText || "확인"}
                    onClick={onOk}
                  />
                </div>
              </Flex>
            </Flex>
          </Flex>
        </div>
      );
    case "default":
      return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50">
          <Flex
            width={"60vw"}
            direction="column"
            className="absolute bg-white top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-feedback rounded-[16px] overflow-hidden"
          >
            <Flex width={"100%"} justify="center" className="pt-[8px]">
              <ExclamationCircleFill size={16} className="fill-dark-900" />
            </Flex>
            <Flex width={"100%"} direction="column">
              <Flex
                width={"100%"}
                justify="center"
                className="px-[12px] py-[24px]"
              >
                <p className="text-p2R text-dark">{options.text}</p>
              </Flex>
              <Flex width={"100%"}>
                <div className="w-[50%] flex justify-center bg-base-A">
                  <Button
                    width={"50%"}
                    font="span1R"
                    bgColor="BASE_A"
                    textColor="DARK_500"
                    size={32}
                    label={options.cancelText || "취소"}
                    onClick={onCancel}
                  />
                </div>
                <div className="w-[50%] flex justify-center bg-dark-900">
                  <Button
                    width={"100%"}
                    font="span1B"
                    bgColor="DARK_900"
                    size={32}
                    label={options.okText || "확인"}
                    onClick={onOk}
                  />
                </div>
              </Flex>
            </Flex>
          </Flex>
        </div>
      );
  }
}

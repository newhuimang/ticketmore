import Flex from "@/components/Flex";
import { ExclamationCircleFill } from "react-bootstrap-icons";
export default function MobileNodataMessage() {
  return (
    <Flex width={"100%"} direction="column" items="center" gap={{ row: 8 }} className="my-auto">
      <ExclamationCircleFill size={24} className="fill-dark-300" />
      <p className="text-p2B text-dark-300">서비스 준비중입니다.</p>
    </Flex>
  );
}

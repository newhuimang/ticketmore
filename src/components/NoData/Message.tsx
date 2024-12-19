import Flex from "@/components/Flex";
import { ExclamationCircleFill } from "react-bootstrap-icons";
export default function MobileNodataMessage({ msg }: { msg: string }) {
  return (
    <Flex
      width={"100%"}
      direction="column"
      items="center"
      justify="center"
      gap={{ row: 8 }}
      className="border-dashed border-dark-300 border rounded-[12px] py-[40px]"
    >
      <ExclamationCircleFill size={24} className="fill-dark-300" />
      <p className="text-dark-300 text-p1R">{msg}</p>
    </Flex>
  );
}

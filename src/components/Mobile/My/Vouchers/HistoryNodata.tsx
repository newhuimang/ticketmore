import Flex from "@/components/Flex";
import { ExclamationCircleFill, PlusCircleFill } from "react-bootstrap-icons";
export function HistoryNodata() {
  return (
    <Flex
      width={"100%"}
      direction="column"
      items="center"
      gap={{ row: 16 }}
      className="py-[60px] border-dashed border rounded-[12px] border-dark-300"
    >
      <ExclamationCircleFill size={24} className="fill-dark-300" />
      <p className="text-dark-500 text-p2R">정보가 없습니다</p>
    </Flex>
  );
}

export function AvailableNodata({ onClick }: { onClick: () => void }) {
  return (
    <Flex
      width={"100%"}
      direction="column"
      items="center"
      gap={{ row: 8 }}
      onClick={onClick}
      className="py-[40px] border-dashed border rounded-[12px] border-primary-300"
    >
      <PlusCircleFill size={24} className="fill-primary-300 animate-bounce" />
      <p className="text-p2R">등록된 구매권이 없습니다</p>
    </Flex>
  );
}

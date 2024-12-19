import Overlay from "@/components/Mobile/Overlay";
import MobileBookingHistory from "./history";
import MobileBookingWaiting from "./waiting";
import MobileTicket from "./moTicket";
import Flex from "@/components/Flex";

export default function MobileMyBooking({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  const title =
    id === "history"
      ? "예매 / 예매취소"
      : id === "waiting"
        ? "예매대기"
        : "모바일티켓";
  function contents(id: string) {
    switch (id) {
      case "history":
        return <MobileBookingHistory data={data} />;
      case "waiting":
        return <MobileBookingWaiting />;
      case "mo-ticket":
        return <MobileTicket />;
      default:
        return "err";
    }
  }
  return (
    <Overlay>
      <Overlay.Head title={title} />
      <Overlay.Body>
        <Flex
          width={"100%"}
          direction="column"
          gap={{ row: 24 }}
          className="bg-white px-[12px] pt-[16px]"
        >
          {contents(id)}
        </Flex>
      </Overlay.Body>
    </Overlay>
  );
}

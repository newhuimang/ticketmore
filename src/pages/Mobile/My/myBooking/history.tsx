import Flex from "@/components/Flex";
import MobileTab from "@/components/Mobile/Tab";
import { UserBooking } from "@/type/type";
import { useState } from "react";
import { ExclamationCircleFill } from "react-bootstrap-icons";

export default function MobileBookingHistory({ data }: { data: any }) {
  const [filteredData, setFilteredData] = useState(data);

  const filterData = (tab: string) => {
    if (tab === "전체") {
      setFilteredData(data);
    } else if (tab === "예매완료") {
      setFilteredData(
        data.filter((item: UserBooking) => item.isCancel === false)
      );
    } else if (tab === "예매취소") {
      setFilteredData(
        data.filter((item: UserBooking) => item.isCancel === true)
      );
    }
  };
  return (
    <MobileTab
      default={1}
      position="right"
      items={[
        { name: "전체", content: <BookingData data={filteredData} /> },
        { name: "예매완료", content: <BookingData data={filteredData} /> },
        { name: "예매취소", content: <BookingData data={filteredData} /> },
      ]}
      onClick={filterData}
    />
  );
}

function BookingData({ data }: { data: any }) {
  if (!data || data.length === 0) {
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
        <p className="text-dark-300 text-p1R">내역이 없습니다.</p>
      </Flex>
    );
  }

  return data.map((item: UserBooking, idx: number) => (
    <Flex
      key={idx}
      width={"100%"}
      className="rounded-[16px] shadow-basic p-[16px]"
    >
      <p className="text-p1R">{item.events.name}</p>
    </Flex>
  ));
}

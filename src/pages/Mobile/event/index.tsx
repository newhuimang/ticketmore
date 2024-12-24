import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/Button";
import Flex from "@/components/Flex";
import MobileNavBar from "@/components/Mobile/NavBar";
import MobileNodataMessage from "@/components/NoData/Message";

import { ArrowLeft } from "react-bootstrap-icons";

import { EventData } from "@/type/type";
import Chip from "@/components/Chip";
import { formatNumberWithComma } from "@/components/Mobile/My/Vouchers/Utils";

export default function MobileEvent() {
  const [data, setData] = useState<EventData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isReserving, setIsReserving] = useState<boolean>(false);
  // const [reservationSuccess, setReservationSuccess] = useState<boolean | null>(
  //   null
  // );

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventId = params.get("con");

  useEffect(() => {
    axios
      .get("./data/data.json")
      .then((res) => {
        const event = res.data.find((item: EventData) => item.id === eventId);
        if (event) {
          setData(event);
        } else {
          setError("해당 이벤트를 찾을 수 없습니다.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error", err);
        setError("데이터를 불러오는 중에 오류가 발생했습니다.");
        setLoading(false);
      });
  }, [eventId]);

  const handleReservation = async () => {
    if (!data) return;
    setIsReserving(true);
    //TODO Eventbrite api 서치
  };

  if (loading) {
    return (
      <>
        <MobileNavBar
          icon={<ArrowLeft className="fill-dark" size={16} />}
          onClick={() => navigate(-1)}
          share
        />
        <Flex
          width={"100%"}
          direction="column"
          gap={{ row: 12 }}
          className="pt-[52px] h-[calc(100vh-84px)] bg-base-A"
        >
          <div className="w-[calc(100vw-24px)] h-[70vh] bg-dark-100 mx-auto rounded-[12px] animate-pulse" />
          <div className="w-1/2 h-[20px] bg-dark-100 ml-[12px] rounded-[4px] animate-pulse" />
        </Flex>
        <Flex width={"100%"} className="fixed bottom-0 p-[12px] bg-dark-50">
          <div className="w-full h-[60px] rounded-[12px] bg-dark-100 animate-pulse" />
        </Flex>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MobileNavBar
          icon={<ArrowLeft className="fill-dark" size={16} />}
          onClick={() => navigate(-1)}
        />
        <Flex width={"100%"} className="px-[12px] pt-[52px]">
          <MobileNodataMessage msg={error} />
        </Flex>
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <MobileNavBar
        icon={<ArrowLeft className="fill-dark" size={16} />}
        onClick={() => navigate(-1)}
        share
      />
      <Flex
        width={"100%"}
        direction="column"
        className="pt-[52px] h-[calc(100vh-84px)] overflow-y-auto"
      >
        <div
          className="relative w-full min-h-[calc(100vh-136px)] h-[calc(100vh-136px)] bg-cover bg-top"
          style={{
            backgroundImage: `url(${data.image})`,
          }}
        >
          <div className="absolute bottom-0 bg-gradient-to-t from-white to-transparent w-full h-[30vh]" />
        </div>
        <Flex
          width={"100%"}
          direction="column"
          gap={{ row: 32 }}
          className="px-[12px] py-[32px] bg-white"
        >
          <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
            <Flex gap={{ column: 16 }}>
              <h3 className="text-subtitB text-primary-900">{data.name}</h3>
              {data.status.early === true && (
                <Chip label="얼리특가" bgColor="STATE_Y" />
              )}
            </Flex>

            <Flex
              width={"100%"}
              items="center"
              gap={{ column: 16 }}
              className="bg-base-A p-[12px] rounded-[12px]"
            >
              <Flex direction="column" gap={{ row: 4 }}>
                <p className="text-p2R text-dark-300">장소</p>
                <p className="text-p2R text-dark-300">기간</p>
                <p className="text-p2R text-dark-300">관람등급</p>
              </Flex>
              <Flex direction="column" gap={{ row: 4 }}>
                <p className="text-p2R">{data.event.venue}</p>
                <p className="text-p2R">
                  {data.event.startDate} ~ {data.event.endDate}
                </p>
                <p className="text-p2R">{data.event.ageLimit}</p>
              </Flex>
            </Flex>
          </Flex>

          <Flex width={"100%"} direction="column" gap={{ row: 8 }}>
            <p className="text-p1B">공지사항</p>
            <pre className="text-p2R text-wrap px-[12px]">
              {data.event.notice}
            </pre>
          </Flex>

          <Flex width={"100%"} direction="column" gap={{ row: 8 }}>
            <p className="text-p1B">할인정보</p>
            <pre className="text-p2R text-wrap px-[12px]">
              {data.event.discount != null && data.event.discount}
            </pre>
          </Flex>

          <Flex width={"100%"} direction="column" gap={{ row: 8 }}>
            <p className="text-p1B">가격정보</p>
            <Flex
              width={"100%"}
              direction="column"
              gap={{ row: 16 }}
              className="px-[12px]"
            >
              {data.event.ticketTypes &&
                data.event.ticketTypes.map((ticket, idx) => {
                  return (
                    <>
                      <Flex
                        key={idx}
                        width={"100%"}
                        direction="column"
                        gap={{ row: 4 }}
                      >
                        <Flex
                          width={"100%"}
                          justify="between"
                          items="center"
                          gap={{ column: 24 }}
                        >
                          <p className="text-nowrap text-p2R text-primary-900 w-1/3">
                            {ticket.type}
                          </p>

                          <div className="border-dashed border-t w-full border-dark-100" />

                          <Flex items="end" gap={{ column: 4 }}>
                            <p className="text-p1B">
                              {formatNumberWithComma(ticket.price)}
                            </p>
                            <p className="text-p2R">원</p>
                          </Flex>
                        </Flex>

                        <span className="text-p2R text-dark-300">
                          {ticket.description}
                        </span>
                      </Flex>
                    </>
                  );
                })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width={"100%"}
        className="fixed bottom-0 p-[12px] bg-white shadow-bottomNav"
      >
        <Button
          label={
            data.status.open === false
              ? "판매예정"
              : isReserving
                ? "잠시만 기다려주세요"
                : "예매하기"
          }
          size={60}
          font="p1B"
          bgColor="PRIMARY_900"
          disabled={data.status.open === false || isReserving}
          onClick={handleReservation}
        />
      </Flex>
    </>
  );
}

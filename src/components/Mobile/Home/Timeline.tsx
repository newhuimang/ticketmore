import axios from "axios";
import { useEffect, useState } from "react";

import useFeedback from "@/store/useFeedback";
import useAuth from "@/store/useAuth";

import Flex from "@/components/Flex";
import Dot from "@/components/Dot";
import Chip from "@/components/Chip";

import { AlarmFill } from "react-bootstrap-icons";

import { TimelineProps } from "@/type/type";
import useOverlay from "@/store/useOverlay";
import MobileLogin from "@/pages/Mobile/Login";

export default function MobileTimeline() {
  const { isLoggedIn } = useAuth();
  const feedback = useFeedback();
  const { openOverlay } = useOverlay();

  const [data, setData] = useState<TimelineProps[]>([]);

  const toggleAlarm = (parentId: number, eventId: string) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === parentId) {
          const updatedEvents = Object.keys(item.time).reduce(
            (acc, timeKey) => {
              const timeSlot = item.time[timeKey];
              // 알람을 토글할 수 있는 이벤트가 있는 경우만 업데이트
              const updatedEventsForTime = timeSlot.events.map((event) => {
                if (event.id === eventId) {
                  const newAlarmState = !event.alarm;
                  feedback.toast({
                    text: newAlarmState
                      ? "알림설정이 완료되었습니다."
                      : "알림설정이 취소되었습니다.",
                  });
                  return { ...event, alarm: newAlarmState };
                }
                return event;
              });

              acc[timeKey] = { ...timeSlot, events: updatedEventsForTime };
              return acc;
            },
            {} as Record<string, any>
          );

          return { ...item, time: updatedEvents };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    axios
      .get("./data/timeline.json")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error", err));
  }, []);

  return (
    <Flex
      width={"100%"}
      direction="column"
      className="max-h-[80vh] overflow-y-auto"
    >
      <div className="w-full relative">
        {data.map((items) => (
          <div key={items.id} className="w-full">
            {Object.keys(items.time).map((timeKey) => {
              const timeSlot = items.time[timeKey];
              const displayTime =
                timeKey === "1" ? "10:00" : timeKey === "2" ? "14:00" : "err";
              return (
                timeSlot.events.length !== 0 && (
                  <Flex width={"100%"} direction="column">
                    {/* 타임라벨 */}
                    <Flex items="center" gap={{ column: 8 }} key={timeKey}>
                      <Dot size={5} bgColor="DARK" />
                      <Chip
                        label={
                          <Flex gap={{ column: 4 }}>
                            <span className="text-p2R">{items.openDate}</span>
                            <span className="text-p2B">{displayTime}</span>
                          </Flex>
                        }
                        variant="outline"
                      />
                    </Flex>

                    <Flex width={5} justify="center">
                      <div className="border-dashed border-dark-300 border h-[16px]"></div>
                    </Flex>

                    {/* e */}
                    <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
                      {timeSlot.events.map((event) => (
                        <Flex
                          key={event.id}
                          width={"100%"}
                          items="stretch"
                          gap={{ column: 8 }}
                        >
                          {/* thumbnail */}
                          <div
                            className="bg-no-repeat bg-cover bg-center rounded-[12px] min-w-[100px] w-[100px] h-[100px]"
                            style={{ backgroundImage: `url(${event.image})` }}
                          />

                          {/* info */}
                          <Flex
                            width={"100%"}
                            items="stretch"
                            className="rounded-[12px] overflow-hidden bg-base-B"
                          >
                            <Flex
                              width={"100%"}
                              direction="column"
                              justify="between"
                              className="p-[16px]"
                            >
                              <p className="text-p1R">{event.name}</p>

                              <Flex width={"100%"} gap={{ column: 4 }}>
                                <span className="text-p2R text-dark-300">
                                  {event.startDate} {event.endDate !== "-"}
                                  {event.endDate !== event.endDate}
                                </span>
                              </Flex>
                            </Flex>

                            <Flex
                              width={60}
                              items="center"
                              justify="center"
                              className={`${event.alarm ? "bg-primary" : "bg-dark-100"} min-w-[32px] cursor-pointer`}
                              onClick={() => {
                                if (isLoggedIn) {
                                  toggleAlarm(items.id, event.id);
                                } else {
                                  feedback.alert({
                                    text: "로그인 후 이용 가능합니다.",
                                    state: "default",
                                    handleOk: () =>
                                      openOverlay(<MobileLogin />),
                                  });
                                }
                              }}
                            >
                              <AlarmFill className={`fill-white`} />
                            </Flex>
                          </Flex>
                        </Flex>
                      ))}
                    </Flex>

                    <Flex width={5} justify="center">
                      <div className="border-dashed border-dark-300 border h-[40px]"></div>
                    </Flex>
                  </Flex>
                )
              );
            })}
          </div>
        ))}

        <div className="absolute bg-gradient-to-b from-transparent to-white w-full h-[50px] bottom-0" />
      </div>
    </Flex>
  );
}

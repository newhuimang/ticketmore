import axios from "axios";
import { useEffect, useState } from "react";

import { EventData } from "@/type/type";
import Flex from "@/components/Flex";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import MobileNodataMessage from "@/components/NoData/Message";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function MobileWeeklyRank() {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("./data/weeklyRank.json");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("데이터를 불러오는 중에 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex width={"100%"} direction="column" gap={{ row: 32 }}>
        <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
          <WeeklyRankSkeleton />
          <Divider color="bg-dark-50" />
          <WeeklyRankSkeleton />
          <Divider color="bg-dark-50" />
          <WeeklyRankSkeleton />
        </Flex>
        <Button font="p1B" size={50} label="더보기" disabled />
      </Flex>
    );
  }

  if (error) {
    return <MobileNodataMessage msg={error} />;
  }

  return (
    <Flex width={"100%"} direction="column" gap={{ row: 32 }}>
      <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
        {data.slice(0, 3).map((item, index) => {
          return (
            <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
              <Flex key={item.id} width={"100%"} gap={{ column: 8 }}>
                {/* 썸네일 */}
                <div
                  className="relative rounded-[12px] rounded-ss-none min-w-[96px] h-[144px] bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <Flex
                    width={24}
                    items="center"
                    justify="center"
                    className={`absolute top-0 left-0 h-[24px] text-span1B text-white ${index === 0 ? `bg-[#797DFF80]` : `bg-[#00000060]`}`}
                  >
                    {index + 1}
                  </Flex>
                </div>

                {/* 카드 */}
                <Flex
                  width={"100%"}
                  items="stretch"
                  justify="between"
                  className="px-[12px] h-[144px] bg-base-A rounded-[12px] py-[8px]"
                >
                  {/* info */}
                  <Flex width={"100%"} direction="column" justify="between">
                    <Flex direction="column">
                      <p className="text-p1B">{item.name}</p>
                      <span className="text-p2R text-dark-300">
                        {item.event.startDate} ~{" "}
                        {item.event.endDate === "9999.12.31"
                          ? ""
                          : item.event.endDate}
                      </span>
                    </Flex>

                    <Flex direction="column">
                      <p className="text-p2R">{item.organizer}</p>
                      <p className="text-p2R">{item.event.venue}</p>
                    </Flex>

                    <Flex items="center" gap={{ column: 8 }}>
                      <span className="text-p2R text-dark-300">
                        {item.category}
                      </span>
                      <Divider type="vertical" height={14} />
                      <span className="text-p2R text-dark-300">
                        {item.event.ageLimit}
                      </span>
                    </Flex>
                  </Flex>

                  {/* 바로가기 아이콘 */}
                  <Flex
                    items="end"
                    onClick={() => navigate(`/event?con=${item.id}`)}
                  >
                    <ArrowRightCircleFill
                      size={32}
                      className="fill-dark-200 hover:fill-primary"
                    />
                  </Flex>
                </Flex>
              </Flex>

              {index === 2 ? <></> : <Divider color="bg-dark-50" />}
            </Flex>
          );
        })}
      </Flex>
      <Button font="p1B" size={50} bgColor="PRIMARY_900" label="더보기" />
    </Flex>
  );
}

function WeeklyRankSkeleton() {
  return (
    <Flex width={"100%"} gap={{ column: 8 }}>
      <div className="relative rounded-[12px] rounded-ss-none min-w-[96px] h-[144px] bg-dark-100 animate-pulse" />
      <Flex
        width={"100%"}
        direction="column"
        justify="between"
        className="px-[12px] h-[144px] bg-base-A rounded-[12px] py-[8px]"
      >
        <Flex width={"100%"} direction="column" gap={{ row: 4 }}>
          <div className="w-5/6 h-[16px] rounded-[4px] bg-dark-100 animate-pulse" />
          <div className="w-2/5 h-[14px] rounded-[4px] bg-dark-100 animate-pulse" />
        </Flex>

        <Flex width={"100%"} direction="column" gap={{ row: 4 }}>
          <div className="w-1/5 h-[14px] rounded-[4px] bg-dark-100 animate-pulse" />
          <div className="w-2/3 h-[14px] rounded-[4px] bg-dark-100 animate-pulse" />
        </Flex>

        <Flex width={"100%"} items="center" gap={{ column: 8 }}>
          <div className="w-1/3 h-[14px] rounded-[4px] bg-dark-100 animate-pulse" />
          <Divider type="vertical" height={14} />
          <div className="w-1/4 h-[14px] rounded-[4px] bg-dark-100 animate-pulse" />
        </Flex>
      </Flex>
    </Flex>
  );
}

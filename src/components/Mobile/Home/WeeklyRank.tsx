import axios from "axios";
import { useEffect, useState } from "react";

import { EventData } from "@/type/type";
import Flex from "@/components/Flex";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import { ThreeDots } from "react-bootstrap-icons";

export default function MobileWeeklyRank() {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("./data/weeklyRank.json");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data", err);
        setError("데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex
        direction="column"
        items="center"
        justify="center"
        className="h-[180px]"
      >
        <ThreeDots size={20} className="fill-primary-300" />
        <div className="text-p2B text-primary-300">Loading</div>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex width={"100%"} className="mx-auto">
        {error}
      </Flex>
    );
  }

  return (
    <Flex width={"100%"} direction="column" gap={{ row: 24 }}>
      <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
        {data.slice(0, 3).map((item, index) => {
          return (
            <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
              <Flex key={item.id} width={"100%"} gap={{ column: 8 }}>
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
                <Flex
                  width={"100%"}
                  direction="column"
                  justify="between"
                  className="px-[12px] h-[144px] bg-base-A rounded-[12px] py-[8px]"
                >
                  <Flex direction="column">
                    <p className="text-p2B">{item.name}</p>
                    <span className="text-span2R text-dark-300">
                      {item.event.startDate} {item.event.startDate}
                    </span>
                  </Flex>

                  <Flex direction="column">
                    <p className="text-p2R">{item.organizer}</p>
                    <p className="text-p2R">{item.event.venue}</p>
                  </Flex>

                  <Flex items="center" gap={{ column: 8 }}>
                    <span className="text-span2R text-dark-300">
                      {item.category}
                    </span>
                    <Divider type="vertical" height={8} />
                    <span className="text-span2R text-dark-300">
                      {item.event.ageLimit}
                    </span>
                  </Flex>
                </Flex>
              </Flex>

              {index === 2 ? <></> : <Divider color="bg-dark-50" />}
            </Flex>
          );
        })}
      </Flex>
      <Button font="p2B" bgColor="PRIMARY_900" label="더보기" />
    </Flex>
  );
}

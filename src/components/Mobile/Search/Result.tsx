import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Flex from "@/components/Flex";
import MobileSearchbar from "./Searchbar";

import { ExclamationCircleFill, ThreeDots } from "react-bootstrap-icons";

import { EventData } from "@/type/type";
import MobilePromotion from "../Home/Promotion";
import MobileFooter from "../Footer";
import Divider from "@/components/Divider";
import MobileHeader from "../Header";

export default function MobileSearchResult() {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const result = searchParams.get("result");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("./data/data.json");
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

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(result?.toLowerCase() || "") ||
      item.category.toLowerCase().includes(result?.toLowerCase() || "") ||
      item.organizer.toLowerCase().includes(result?.toLowerCase() || "") ||
      item.event.venue.toLowerCase().includes(result?.toLowerCase() || "")
  );

  return (
    <>
      <MobileHeader />
      <Flex width={"100%"} direction="column" className="pt-[56px]">
        <div className="px-[12px] w-full">
          <MobileSearchbar />
        </div>
        {filteredData.length === 0 ? (
          <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
            <Flex
              width={"100%"}
              direction="column"
              items="center"
              justify="center"
              gap={{ row: 8 }}
              className="px-[12px] rounded-[12px] py-[64px]"
            >
              <ExclamationCircleFill size={24} className="fill-dark-100" />
              <p className="text-dark text-center text-p2R">"{result}"</p>
              <p className="text-p1R text-dark-300">
                에 대한 검색결과가 없습니다,
              </p>
            </Flex>
            <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
              <div className="text-p1R pl-[12px]">금주의 추천 키워드</div>
              <MobilePromotion />
            </Flex>
          </Flex>
        ) : (
          <>
            <Flex
              width={"100%"}
              items="end"
              gap={{ column: 4 }}
              className="px-[12px] py-[16px]"
            >
              <span className="text-p1B">티켓</span>
              <span className="text-p2R text-state-R">
                ({filteredData.length})
              </span>
            </Flex>
            <div className="w-full grid grid-cols-2 gap-x-[8px] gap-y-[24px] px-[12px]">
              {filteredData.map((item) => {
                let statusStyle = "border-primary border text-primary";
                let statusText = "판매중";

                if (!item.status.open) {
                  statusStyle = "bg-dark-300 text-white";
                  statusText = "판매예정";
                } else if (item.status.early) {
                  statusStyle = "bg-state-Y text-white";
                  statusText = "얼리특가";
                } else if (item.status.soldOut) {
                  statusStyle = "bg-state-R text-white";
                  statusText = "판매종료";
                }
                return (
                  <Flex
                    key={item.id}
                    direction="column"
                    gap={{ row: 8 }}
                    className="col-span-1"
                    onClick={() => navigate(`/event?con=${item.id}`)}
                  >
                    <div
                      className="w-full bg-no-repeat bg-cover bg-center h-0 pt-[137%] rounded-[8px]"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    />
                    <Flex width={"100%"} direction="column" gap={{ row: 4 }}>
                      <p className="w-full truncate text-p1B text-primary-900 px-[2px]">
                        {item.name}
                      </p>
                      <Flex
                        items="center"
                        justify="center"
                        className={`px-[8px] h-[20px] text-span1R rounded-[4px] ${statusStyle}`}
                      >
                        {statusText}
                      </Flex>
                      <Flex
                        width={"100%"}
                        direction="column"
                        className="px-[2px]"
                      >
                        <p className="text-span1R w-full truncate">
                          {item.event.venue}
                        </p>
                        <Flex items="end" gap={{ column: 2 }}>
                          <span className="text-span1R text-dark-300">
                            {item.event.startDate}
                          </span>
                          <span className="text-span1R text-dark-300">~</span>
                          <span className="text-span1R text-dark-300">
                            {item.event.endDate === "9999.12.31"
                              ? ""
                              : item.event.endDate}
                          </span>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}
            </div>
          </>
        )}
      </Flex>
      <Flex width={"100%"} direction="column" className="pt-[32px]">
        <Divider />
        <MobileFooter />
      </Flex>
    </>
  );
}

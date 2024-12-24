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
        <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
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
                <div className="text-p1B pl-[12px]">이런 상품은 어떠세요?</div>
                <MobilePromotion />
              </Flex>
            </Flex>
          ) : (
            <>
              <Flex width={"100%"} direction="column" className="p-[12px]">
                <Flex width={"100%"} items="end" gap={{ column: 4 }}>
                  <span className="text-p1B">티켓</span>
                  <span className="text-p2R text-state-R">
                    ({filteredData.length})
                  </span>
                </Flex>
                <Flex
                  width={"100%"}
                  direction="column"
                  gap={{ row: 24 }}
                  className="pt-[16px]"
                >
                  {filteredData.map((item, idx) => {
                    let statusStyle = "border-primary text-primary";
                    let statusText = "판매중";

                    if (!item.status.open) {
                      statusStyle = "border-dark text-dark";
                      statusText = "판매예정";
                    } else if (item.status.early) {
                      statusStyle = "border-state-Y text-state-Y";
                      statusText = "얼리특가";
                    } else if (item.status.soldOut) {
                      statusStyle = "border-state-R text-state-R";
                      statusText = "판매종료";
                    }

                    return (
                      <>
                        <Flex
                          key={item.id}
                          width={"100%"}
                          items="stretch"
                          gap={{ column: 16 }}
                        >
                          <div
                            className="min-w-[180px] h-[240px] rounded-[8px] bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: `url('${item.image}')` }}
                          />
                          <Flex
                            width={"100%"}
                            direction="column"
                            justify="between"
                            onClick={() => navigate(`/event?con=${item.id}`)}
                            className="h-5/6 my-auto"
                          >
                            <Flex
                              width={"100%"}
                              direction="column"
                              gap={{ row: 8 }}
                            >
                              <Flex
                                items="center"
                                justify="center"
                                className={`px-[8px] h-[20px] text-span1R rounded-[4px] border ${statusStyle}`}
                              >
                                {statusText}
                              </Flex>
                              <p className="text-primary-900 text-p1B">
                                {item.name}
                              </p>
                            </Flex>

                            <Flex width={"100%"} direction="column">
                              <p className="text-p2R">{item.event.venue}</p>
                              <p className="text-p2R">{item.organizer}</p>
                            </Flex>

                            <Flex
                              gap={{ column: 8 }}
                              className="text-p2R text-dark-300"
                            >
                              {item.event.startDate} ~{" "}
                              {item.event.endDate === "9999.12.31"
                                ? ""
                                : item.event.endDate}
                            </Flex>
                          </Flex>
                        </Flex>

                        {filteredData.length - 1 > idx && <Divider />}
                      </>
                    );
                  })}
                </Flex>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>

      <MobileFooter />
    </>
  );
}

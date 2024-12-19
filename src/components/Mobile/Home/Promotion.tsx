import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import { useNavigate } from "react-router-dom";

import Flex from "@/components/Flex";
import Chip from "@/components/Chip";
import Divider from "@/components/Divider";
import MobileNodataMessage from "@/components/NoData/Message";

import { EventData } from "@/type/type";
import { BGColor } from "@/type/style";

import "swiper/css";
import "swiper/css/navigation";

export default function MobilePromotion() {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("./data/data.json")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error", err);
        setError("데이터를 불러오는 중에 오류가 발생했습니다.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <>
        <Flex
          gap={{ column: 12 }}
          className="w-auto max-w-[100%] px-[12px] overflow-auto"
        >
          <PromotionSkeleton />
          <PromotionSkeleton />
          <PromotionSkeleton />
        </Flex>
      </>
    );
  if (error)
    return (
      <>
        <Flex width={"100%"} className="px-[12px]">
          <MobileNodataMessage msg={error} />
        </Flex>
      </>
    );

  return (
    <>
      <Swiper
        spaceBetween={12}
        slidesPerView={"auto"}
        className="w-auto max-w-[100%] px-[12px]"
      >
        {data.map((items) => {
          let chipColor: BGColor = "PRIMARY";
          let chipText = "판매중";

          if (!items.status.open) {
            chipColor = "DARK_300";
            chipText = "판매예정";
          } else if (items.status.early) {
            chipColor = "STATE_Y";
            chipText = "얼리특가";
          } else if (items.status.soldOut) {
            chipColor = "DARK_300";
            chipText = "판매종료";
          }

          return (
            <SwiperSlide
              key={items.id}
              onClick={() => {
                navigate(`/event?con=${items.id}`);
              }}
              className="w-[240px] max-w-[240px]"
            >
              <Flex
                width={"100%"}
                className="relative rounded-[12px] bg-cover bg-center h-[360px]"
                style={{
                  backgroundImage: `url(${items.image})`,
                }}
              >
                <Flex
                  width={"100%"}
                  direction="column"
                  justify="between"
                  className="absolute rounded-[12px] px-[12px] pt-[12px] pb-[24px] top-0 left-0 bg-gradient-to-b from-black/30 to-black/70 h-full"
                >
                  <Chip label={chipText} bgColor={chipColor} />
                  <Flex
                    width={"100%"}
                    direction="column"
                    gap={{ row: 8 }}
                    className="text-white"
                  >
                    <p className="text-p1B w-full truncate">{items.name}</p>
                    <Flex width={"100%"} direction="column">
                      <Flex
                        items="center"
                        gap={{ column: 8 }}
                        className="text-span1R"
                      >
                        <span>{items.event.startDate}</span>-
                        <span>{items.event.endDate}</span>
                      </Flex>
                      <Flex items="center" gap={{ column: 8 }}>
                        <span className="text-span1R text-white">
                          {items.category}
                        </span>
                        <Divider
                          type="vertical"
                          height={8}
                          color="bg-dark-300"
                        />
                        <span className="text-span1R text-white">
                          {items.event.ageLimit}
                        </span>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

function PromotionSkeleton() {
  return (
    <div className="min-w-[240px] max-w-[240px]">
      <Flex
        width={"100%"}
        className="relative w-[240px] rounded-[12px] bg-dark-50 h-[360px]"
      >
        <Flex
          width={"100%"}
          direction="column"
          justify="between"
          className="absolute rounded-[12px] px-[12px] pt-[12px] pb-[24px] top-0 left-0 h-full"
        >
          <div className="w-[60px] h-[24px] bg-dark-100 rounded-full animate-pulse" />
          <Flex
            width={"100%"}
            direction="column"
            gap={{ row: 8 }}
            className="text-white"
          >
            <div className="w-full h-[24px] bg-dark-100 rounded-[4px] animate-pulse" />
            <Flex width={"100%"} direction="column" gap={{ row: 4 }}>
              <Flex width={"100%"} items="center" gap={{ column: 8 }}>
                <div className="w-1/2 h-[16px] bg-dark-100 rounded-[4px] animate-pulse" />
              </Flex>
              <Flex width={"100%"} items="center" gap={{ column: 8 }}>
                <div className="w-1/5 h-[16px] bg-dark-100 rounded-[4px] animate-pulse" />
                <Divider type="vertical" height={8} color="bg-dark-300" />
                <div className="w-1/3 h-[16px] bg-dark-100 rounded-[4px] animate-pulse" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

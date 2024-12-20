import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Flex from "@/components/Flex";
import MobileSearchbar from "./Searchbar";
import MobileHeader from "../Header";

import { ThreeDots } from "react-bootstrap-icons";

import { EventData } from "@/type/type";

export default function MobileSearchResult() {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const result = searchParams.get("result");

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

      <Flex
        width={"100%"}
        direction="column"
        gap={{ row: 16 }}
        className="px-[12px] pt-[56px]"
      >
        <MobileSearchbar />

        {filteredData.length === 0 ? (
          <p className="text-center pt-[16px]">검색 결과가 없습니다.</p>
        ) : (
          <ul>
            {filteredData.map((item) => (
              <li key={item.id} className="mb-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>{item.category}</p>
              </li>
            ))}
          </ul>
        )}
      </Flex>
    </>
  );
}

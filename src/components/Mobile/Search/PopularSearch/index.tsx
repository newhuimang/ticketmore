import Flex from "@/components/Flex";

export default function MobilePopularSearch() {
  const keyword = [
    "기아 타이거즈",
    "아이유",
    "서울 제즈 페스티벌 서울 제즈 페스티벌 서울 제즈 페스티벌 서울 제즈 페스티벌",
    "코리아 시리즈",
    "시카고",
  ];
  return (
    <Flex
      width={"100%"}
      direction="column"
      gap={{ row: 16 }}
      className="px-[4px] overflow-hidden"
    >
      <p className="text-subtitB text-primary-900">인기검색어</p>

      <Flex width={"100%"}>
        <Flex width={24} direction="column" gap={{ row: 16 }}>
          {[1, 2, 3, 4, 5].map((number) => (
            <Flex
              key={number}
              width={24}
              items="center"
              className={`${number === 1 ? "text-primary text-p1B" : "text-p1R text-dark"} h-[32px]`}
            >
              {number}
            </Flex>
          ))}
        </Flex>
        <Flex width={"calc(100% - 59px)"} direction="column" gap={{ row: 16 }}>
          {keyword.map((item, i) => {
            return (
              <Flex width={"100%"} key={i} items="center" className="h-[32px]">
                <p className="w-full text-p1R text-ellipsis overflow-hidden whitespace-nowrap">
                  {item}
                </p>
              </Flex>
            );
          })}
        </Flex>

        <Flex
          width={35}
          direction="column"
          items="end"
          gap={{ row: 16 }}
          className="mr-[4px]"
        >
          <Flex
            justify="end"
            items="center"
            gap={{ column: 8 }}
            className="h-[32px]"
          >
            <span className="text-p2Rt">ㅡ</span>
          </Flex>
          <Flex
            justify="end"
            items="center"
            gap={{ column: 8 }}
            className="h-[32px]"
          >
            <span className="text-p2Rt">ㅡ</span>
          </Flex>
          <Flex
            justify="end"
            items="center"
            gap={{ column: 8 }}
            className="h-[32px]"
          >
            <span className="text-p2Rt">ㅡ</span>
          </Flex>
          <Flex
            justify="end"
            items="center"
            gap={{ column: 8 }}
            className="h-[32px]"
          >
            <span className="text-p2Rt">ㅡ</span>
          </Flex>
          <Flex
            justify="end"
            items="center"
            gap={{ column: 8 }}
            className="h-[32px]"
          >
            <span className="text-p2Rt">ㅡ</span>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

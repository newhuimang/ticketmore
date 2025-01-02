import { Fragment, useEffect, useState } from "react";

import Overlay from "@/components/Mobile/Overlay";
import MobileSendVouchers from "./sendVouchers";
import { HistoryNodata } from "./HistoryNodata";

import Flex from "@/components/Flex";
import Divider from "@/components/Divider";

import { Points, UserVouchersList } from "@/type/type";
import { formatNumberWithComma, getMaskingValues } from "./Utils";

import { PlusCircleFill } from "react-bootstrap-icons";

export default function MyHistory({
  type,
  data,
}: {
  type: "point" | "coupon" | "gifts";
  data: any | null;
}) {
  const [coupons, setCoupons] = useState<UserVouchersList["list"]["availed"]>(
    []
  );
  const [addList, setAddList] = useState<boolean>(false);

  const title =
    type === "point"
      ? "포인트 상세 내역"
      : type === "coupon"
        ? "나의 쿠폰"
        : "나의 구매권";

  useEffect(() => {
    if (data && data.list && Array.isArray(data.list.availed)) {
      setCoupons(data.list.availed);
    }
  }, [data]);

  const contents = () => {
    switch (type) {
      case "point":
        if (data && data.history && Array.isArray(data.history)) {
          return (
            <Flex
              width={"100%"}
              direction="column"
              gap={{ row: 8 }}
              className="pt-[16px] px-[12px]"
            >
              <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
                {/* 이벤트 포인트 */}

                {data.history.map(
                  (historyItem: Points["history"][number], index: number) => (
                    <>
                      <Flex
                        key={index}
                        width={"100%"}
                        direction="column"
                        gap={{ row: 8 }}
                      >
                        <p className="text-p2R text-dark-300">
                          {historyItem.update}
                        </p>
                        <Flex width={"100%"} justify="between">
                          <p className="text-p1R">
                            {historyItem.rewardSource
                              ? historyItem.rewardSource
                              : historyItem.usePoint}
                          </p>
                          <p
                            className={`text-p1B ${historyItem.getReward !== 0 ? "text-primary" : "text-state-R"}`}
                          >
                            {historyItem.getReward !== 0
                              ? `+ ` + historyItem.getReward
                              : `- ` +
                                formatNumberWithComma(
                                  historyItem.useReward
                                )}{" "}
                            p
                          </p>
                        </Flex>
                      </Flex>
                      {index < data.history.length - 1 && <Divider />}
                    </>
                  )
                )}
              </Flex>

              <p className="text-span1R text-dark-300 ml-auto mb-[8px]">
                *최근 6개월 내역까지 조회 가능합니다
              </p>
            </Flex>
          );
        }
        break;
      case "coupon":
        return (
          <HistoryTab
            list={[
              {
                label: "이용 가능",
                values: "available",
                contents: (
                  <>
                    {addList === true ? (
                      <MobileSendVouchers
                        type={type}
                        coupons={coupons}
                        setCoupons={setCoupons}
                        setAddList={setAddList}
                      />
                    ) : (
                      <Flex width={"100%"} className="px-[12px]">
                        <Flex
                          width={"100%"}
                          direction="column"
                          items="center"
                          justify="center"
                          gap={{ row: 8 }}
                          onClick={() => setAddList(true)}
                          className="border border-dashed border-primary-300 rounded-[8px] h-[88px]"
                        >
                          <PlusCircleFill
                            size={24}
                            className={`fill-primary-300 animate-bounce`}
                          />
                          <span className="text-p2B text-primary-300">
                            바우처 등록하기
                          </span>
                        </Flex>
                      </Flex>
                    )}

                    <Flex
                      width={"100%"}
                      direction="column"
                      gap={{ row: 16 }}
                      className="overflow-y-auto max-h-[calc(100vh-245px)] px-[12px]"
                    >
                      {coupons
                        .slice()
                        .reverse()
                        .map((couponList) => {
                          return (
                            <Flex
                              key={couponList.id}
                              width={"100%"}
                              items="stretch"
                              gap={{ row: 8 }}
                              className="bg-white rounded-[12px] shadow-key"
                            >
                              <Flex
                                width={"30%"}
                                items="center"
                                justify="center"
                                className="bg-primary-900 rounded-l-[12px]"
                              >
                                <Flex items="end" gap={{ column: 4 }}>
                                  <span className="text-h2B text-white">
                                    {couponList.discountRate}
                                  </span>
                                  <span className="text-p2R text-white mb-1">
                                    %
                                  </span>
                                </Flex>
                              </Flex>
                              <Flex
                                width={"100%"}
                                direction="column"
                                gap={{ row: 8 }}
                                className="px-[16px] pt-[12px] pb-[8px]"
                              >
                                <p className="text-subtitR text-primary-900">
                                  {couponList.name}
                                </p>
                                <Flex gap={{ column: 8 }}>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R text-dark-300">
                                      쿠폰번호
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      등록일
                                    </p>
                                  </Flex>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R text-dark-300">
                                      {getMaskingValues(couponList.id)}
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      {couponList.createdDate}
                                    </p>
                                  </Flex>
                                </Flex>
                                <p className="ml-auto text-span1B text-state-R">
                                  ~ {couponList.expiration}
                                </p>
                              </Flex>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </>
                ),
              },
              {
                label: "지난 내역",
                values: "history",
                contents: (
                  <Flex
                    width={"100%"}
                    direction="column"
                    gap={{ row: 16 }}
                    className="px-[12px]"
                  >
                    {data.list.used && data.list.used.length > 0 ? (
                      data.list.used.map(
                        (
                          couponUseList: UserVouchersList["list"]["used"][number]
                        ) => {
                          return (
                            <Flex
                              key={couponUseList.id}
                              width={"100%"}
                              items="stretch"
                              gap={{ row: 8 }}
                              className="bg-white rounded-[12px] shadow-key"
                            >
                              <Flex
                                width={"30%"}
                                items="center"
                                justify="center"
                                className="bg-dark-100 rounded-l-[12px]"
                              >
                                <Flex items="end" gap={{ column: 4 }}>
                                  <span className="text-h2B text-dark-300">
                                    {couponUseList.discountRate}
                                  </span>
                                  <span className="text-p2R text-dark-300 mb-1">
                                    %
                                  </span>
                                </Flex>
                              </Flex>
                              <Flex
                                width={"100%"}
                                direction="column"
                                gap={{ row: 8 }}
                                className="px-[16px] pt-[12px] pb-[8px]"
                              >
                                <p className="text-subtitR text-primary-900">
                                  {couponUseList.name}
                                </p>
                                <Flex gap={{ column: 8 }}>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R text-dark-300">
                                      쿠폰번호
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      등록일
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      사용일
                                    </p>
                                  </Flex>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R">
                                      {getMaskingValues(couponUseList.id)}
                                    </p>
                                    <p className="text-p2R">
                                      {couponUseList.createdDate}
                                    </p>
                                    <p
                                      className={`text-p2R ${
                                        couponUseList.isActive === false
                                          ? "text-state-R"
                                          : ""
                                      }`}
                                    >
                                      {couponUseList.isActive === false
                                        ? "유효기간 만료"
                                        : couponUseList.useDate}
                                    </p>
                                  </Flex>
                                </Flex>
                                <p className="ml-auto text-span1R text-dark-300">
                                  ~ {couponUseList.expiration}
                                </p>
                              </Flex>
                            </Flex>
                          );
                        }
                      )
                    ) : (
                      <HistoryNodata />
                    )}
                  </Flex>
                ),
              },
            ]}
          />
        );
      case "gifts":
        return (
          <HistoryTab
            list={[
              {
                label: "이용 가능",
                values: "available",
                contents: (
                  <>
                    {addList === true ? (
                      <MobileSendVouchers
                        type={type}
                        coupons={coupons}
                        setCoupons={setCoupons}
                        setAddList={setAddList}
                      />
                    ) : (
                      <Flex width={"100%"} className="px-[12px]">
                        <Flex
                          width={"100%"}
                          direction="column"
                          items="center"
                          justify="center"
                          gap={{ row: 8 }}
                          onClick={() => setAddList(true)}
                          className="border border-dashed border-primary-300 rounded-[8px] h-[88px]"
                        >
                          <PlusCircleFill
                            size={24}
                            className={`fill-primary-300 animate-bounce`}
                          />
                          <span className="text-p2B text-primary-300">
                            바우처 등록하기
                          </span>
                        </Flex>
                      </Flex>
                    )}

                    <Flex
                      width={"100%"}
                      direction="column"
                      gap={{ row: 16 }}
                      className="overflow-y-auto max-h-[calc(100vh-245px)] px-[12px]"
                    >
                      {coupons
                        .slice()
                        .reverse()
                        .map((couponList) => {
                          return (
                            <Flex
                              key={couponList.id}
                              width={"100%"}
                              items="stretch"
                              justify="end"
                              gap={{ row: 8 }}
                              className="rounded-[12px]"
                            >
                              <div className="w-[50px] bg-primary-900 rounded-l-[12px]" />
                              <Flex
                                width={"100%"}
                                direction="column"
                                gap={{ row: 8 }}
                                className="bg-white rounded-r-[12px] pl-[16px] py-[12px]"
                              >
                                <p className="text-subtitR text-primary-900">
                                  {couponList.name}
                                </p>
                                <Flex gap={{ column: 8 }}>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R text-dark-300">
                                      쿠폰번호
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      등록일
                                    </p>
                                  </Flex>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R text-dark-300">
                                      {getMaskingValues(couponList.id)}
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      {couponList.createdDate}
                                    </p>
                                  </Flex>
                                </Flex>
                              </Flex>
                              <div className="my-[12px] border-l border-dashed border-dark-100" />
                              <Flex
                                direction="column"
                                gap={{ row: 8 }}
                                className="bg-white [h-100%] px-[16px] py-[16px] rounded-[12px] box-border"
                              >
                                <Flex
                                  width={"100%"}
                                  direction="column"
                                  gap={{ row: 4 }}
                                >
                                  <div className="w-full h-[2px] bg-dark-600" />
                                  <div className="w-full h-[1px] bg-dark-400" />
                                  <div className="w-full h-[3px] bg-dark-800" />
                                  <div className="w-full h-[6px] bg-dark-200" />
                                  <div className="w-full h-[2px] bg-dark-100" />
                                  <div className="w-full h-[3px] bg-dark-500" />
                                  <div className="w-full h-[1px] bg-dark-500" />
                                  <div className="w-full h-[2px] bg-dark-300" />
                                  <div className="w-full h-[1px] bg-dark-400" />
                                  <div className="w-full h-[3px] bg-dark-800" />
                                </Flex>
                                <p className="w-fit ml-auto text-span1B text-state-R text-nowrap">
                                  ~ {couponList.expiration}
                                </p>
                              </Flex>
                            </Flex>
                          );
                        })}
                    </Flex>
                  </>
                ),
              },
              {
                label: "지난 내역",
                values: "history",
                contents: (
                  <Flex
                    width={"100%"}
                    direction="column"
                    gap={{ row: 16 }}
                    className="px-[12px]"
                  >
                    {data.list.used && data.list.used.length > 0 ? (
                      data.list.used.map(
                        (
                          couponUseList: UserVouchersList["list"]["used"][number]
                        ) => {
                          return (
                            <Flex
                              key={couponUseList.id}
                              width={"100%"}
                              items="stretch"
                              justify="end"
                              gap={{ row: 8 }}
                              className="rounded-[12px]"
                            >
                              <div className="w-[50px] bg-dark-100 rounded-l-[12px]" />
                              <Flex
                                width={"100%"}
                                direction="column"
                                gap={{ row: 8 }}
                                className="bg-white rounded-r-[12px] pl-[16px] py-[12px]"
                              >
                                <p className="text-subtitR text-primary-900">
                                  {couponUseList.name}
                                </p>
                                <Flex gap={{ column: 8 }}>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R text-dark-300">
                                      쿠폰번호
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      등록일
                                    </p>
                                    <p className="text-p2R text-dark-300">
                                      사용일
                                    </p>
                                  </Flex>
                                  <Flex direction="column" gap={{ row: 2 }}>
                                    <p className="text-p2R">
                                      {getMaskingValues(couponUseList.id)}
                                    </p>
                                    <p className="text-p2R">
                                      {couponUseList.createdDate}
                                    </p>
                                    <p
                                      className={`text-p2R ${
                                        couponUseList.isActive === false
                                          ? "text-state-R"
                                          : ""
                                      }`}
                                    >
                                      {couponUseList.isActive === false
                                        ? "유효기간 만료"
                                        : couponUseList.useDate}
                                    </p>
                                  </Flex>
                                </Flex>
                              </Flex>
                              <div className="my-[12px] border-l border-dashed border-dark-100" />
                              <Flex
                                direction="column"
                                gap={{ row: 8 }}
                                className="bg-white [h-100%] px-[16px] py-[16px] rounded-[12px] box-border"
                              >
                                <Flex
                                  width={"100%"}
                                  direction="column"
                                  gap={{ row: 4 }}
                                >
                                  <div className="w-full h-[2px] bg-dark-600" />
                                  <div className="w-full h-[1px] bg-dark-400" />
                                  <div className="w-full h-[3px] bg-dark-800" />
                                  <div className="w-full h-[6px] bg-dark-200" />
                                  <div className="w-full h-[2px] bg-dark-100" />
                                  <div className="w-full h-[3px] bg-dark-500" />
                                  <div className="w-full h-[1px] bg-dark-500" />
                                  <div className="w-full h-[2px] bg-dark-300" />
                                  <div className="w-full h-[1px] bg-dark-400" />
                                  <div className="w-full h-[3px] bg-dark-800" />
                                </Flex>
                                <p className="w-fit ml-auto text-span1R text-dark-300 text-nowrap">
                                  ~ {couponUseList.expiration}
                                </p>
                              </Flex>
                            </Flex>
                          );
                        }
                      )
                    ) : (
                      <HistoryNodata />
                    )}
                  </Flex>
                ),
              },
            ]}
          />
        );
    }
  };

  return (
    <Overlay>
      <Overlay.Head title={title} />
      <Overlay.Body>
        <Flex
          width={"100%"}
          direction="column"
          gap={{ row: 24 }}
          className="bg-base-A pt-[12px] min-h-[calc(100vh-40.4px)]"
        >
          {contents()}
        </Flex>
      </Overlay.Body>
    </Overlay>
  );
}

interface HistoryTabProps {
  list: Array<{
    label: string;
    values: "available" | "history";
    contents: React.ReactNode;
  }>;
}

function HistoryTab({ list }: HistoryTabProps) {
  const [historyTabActive, setHistoryTabActive] = useState<
    "available" | "history"
  >("available");

  return (
    <>
      <Flex width={"100%"}>
        {list.map((tab) => (
          <Flex
            key={tab.values}
            width={"50%"}
            direction="column"
            justify="center"
            items="center"
            onClick={() => setHistoryTabActive(tab.values)}
            className="bg-white"
          >
            <span
              className={`${historyTabActive === tab.values ? "text-p1B text-primary" : "text-p1R"} pb-[4px]`}
            >
              {tab.label}
            </span>
            <div
              className={`h-[2px] ${
                historyTabActive === tab.values
                  ? "w-full border-b-2 border-primary-300 transform scale-x-100 mx-auto transition-all duration-300 ease-in-out"
                  : "transform scale-x-0 mx-0 transition-all duration-300 ease-in-out"
              }`}
            />
          </Flex>
        ))}
      </Flex>

      <>
        {list.map(
          (tab) =>
            tab.values === historyTabActive && (
              <Fragment key={tab.values}>{tab.contents}</Fragment>
            )
        )}
      </>
    </>
  );
}

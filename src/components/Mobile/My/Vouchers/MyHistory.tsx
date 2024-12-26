import { Fragment, useEffect, useState } from "react";

import Overlay from "@/components/Mobile/Overlay";
import MobileSendVouchers from "./sendVouchers";
import { HistoryNodata } from "./HistoryNodata";

import Flex from "@/components/Flex";
import Divider from "@/components/Divider";

import { Points, UserVouchersList } from "@/type/type";
import { formatNumberWithComma } from "./Utils";

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
            <>
              <Flex
                width={"100%"}
                direction="column"
                gap={{ row: 16 }}
                className="h-[100%]"
              >
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
            </>
          );
        }
        break;
      case "coupon":
        if (data && data.list) {
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
                          setCoupons={setCoupons}
                          setAddList={setAddList}
                        />
                      ) : (
                        <Flex
                          width={"100%"}
                          direction="column"
                          items="center"
                          justify="center"
                          gap={{ row: 8 }}
                          onClick={() => setAddList(true)}
                          className="border border-dashed border-primary-300 rounded-[8px] h-[88px] px-[12px]"
                        >
                          <PlusCircleFill
                            size={24}
                            className={`fill-primary-300 animate-bounce`}
                          />
                          <span className="text-p2B text-primary-300">
                            바우처 등록하기
                          </span>
                        </Flex>
                      )}

                      <Flex
                        width={"100%"}
                        direction="column"
                        gap={{ row: 16 }}
                        className="overflow-y-auto max-h-[calc(100vh-245px)]"
                      >
                        {coupons.map((couponList) => {
                          return (
                            <Flex
                              key={couponList.id}
                              width={"100%"}
                              direction="column"
                              gap={{ row: 8 }}
                              className="border border-primary-100 bg-white rounded-[12px] shadow-key py-[8px] px-[12px]"
                            >
                              <p className="text-p2R">{couponList.code}</p>
                              <p className="ml-auto text-span2B text-state-R">
                                {couponList.expiration}
                              </p>
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
                  contents:
                    data.list.used && data.list.used.length > 0 ? (
                      data.list.used
                        .filter(
                          (
                            couponUseList: UserVouchersList["list"]["used"][number]
                          ) => couponUseList.isActive === false
                        )
                        .map(
                          (
                            couponUseList: UserVouchersList["list"]["used"][number],
                            i: number
                          ) => {
                            return (
                              <>
                                <Flex
                                  key={i}
                                  width={"100%"}
                                  direction="column"
                                  gap={{ row: 8 }}
                                  className="border border-dark-100 bg-white rounded-[12px] shadow-key py-[8px] px-[12px]"
                                >
                                  <p className="text-p2R text-dark-300">
                                    {couponUseList.code}
                                  </p>
                                  <Flex gap={{ column: 4 }}>
                                    <p className="text-span1R text-dark-300">
                                      사용일 :
                                    </p>
                                    <p className="text-span1B text-dark-300">
                                      {" "}
                                      {couponUseList.isActive === false
                                        ? "유효기간 만료"
                                        : couponUseList.useDate}
                                    </p>
                                  </Flex>
                                </Flex>
                              </>
                            );
                          }
                        )
                    ) : (
                      <HistoryNodata />
                    ),
                },
              ]}
            />
          );
        }
        break;
      case "gifts":
        return (
          <HistoryTab
            list={[
              {
                label: "이용 가능",
                values: "available",
                contents: <></>,
              },
              {
                label: "지난 내역",
                values: "history",
                contents: <HistoryNodata />,
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
          className="bg-white px-[12px] pt-[16px]"
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
          >
            <span
              className={`${historyTabActive === tab.values ? "text-p1B text-primary" : "text-p1R"} pb-[4px]`}
            >
              {tab.label}
            </span>
            <div
              className={`h-[1px] ${
                historyTabActive === tab.values
                  ? "w-full border-b border-primary-300 transform scale-x-100 mx-auto transition-all duration-300 ease-in-out"
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

import MobileCategoryTab from "@/components/Mobile/Category/categoryTab";
// import MobileNavBar from "@/components/Mobile/NavBar";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

interface listProps {
  label: string;
  contents: React.ReactNode;
  values: string;
}

export default function MobilePerformance() {
  // const [categoryActive, setCategoryActive] = useState<string>("");

  // const navigate = useNavigate();

  const list: listProps[] = [
    {
      label: "콘서트",
      contents: <>콘서트 내용입니다</>,
      values: "concert",
    },
    {
      label: "뮤지컬",
      contents: <>뮤지컬 내용입니다</>,
      values: "musical",
    },
    {
      label: "연극",
      contents: <>연극 내용입니다</>,
      values: "theater",
    },
    {
      label: "페스티벌",
      contents: <>페스티벌 내용입니다</>,
      values: "festival",
    },
    {
      label: "클래식/무용",
      contents: <>클래식/무용 내용입니다</>,
      values: "classic-dance",
    },
  ];
  return (
    <>
      <MobileCategoryTab title="공연" list={list} />
    </>
  );
}

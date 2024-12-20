import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";

import useRecentSearches from "@/store/useSearch";

import Input from "@/components/Form/Input";
import Flex from "@/components/Flex";
import { Search } from "react-bootstrap-icons";

export default function MobileSearchbar() {
  const { addSearch } = useRecentSearches();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values) => {
        const searchTerm = values.search.trim();
        console.log(values);
        if (searchTerm !== "") {
          addSearch(searchTerm);
        }
        navigate(`/search?result=${encodeURIComponent(values.search)}`);
      }}
    >
      <Form className="w-full">
        <Flex width={"100%"} items="center" className="relative mx-auto">
          <Input
            name="search"
            type="text"
            placeholder="검색어를 입력하세요"
            className="pr-[30px]"
          />
          <button
            type="submit"
            className={`w-[24px] h-[24px] bg-white absolute flex justify-center items-center top-1/2 right-0 translate-x-[-12px] translate-y-[-50%]`}
          >
            <Search size={18} className="fill-primary-300" />
          </button>
        </Flex>
      </Form>
    </Formik>
  );
}

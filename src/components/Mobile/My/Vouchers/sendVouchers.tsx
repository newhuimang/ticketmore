import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "@/components/Button";
import Flex from "@/components/Flex";

import { UserVouchersList } from "@/type/type";

export default function MobileSendVouchers({
  setCoupons,
  setAddList,
}: {
  setCoupons: React.Dispatch<
    React.SetStateAction<UserVouchersList["list"]["availed"]>
  >;

  setAddList: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const validationSchema = Yup.object({
    voucherCode: Yup.string()
      .required("필수입니다.")
      .matches(
        /^[a-zA-Z0-9]{16}$/,
        "한글 제외. 영문, 숫자 포함 4자씩 총 16자를 입력하세요."
      ),
  });

  return (
    <Formik
      initialValues={{
        voucherCode1: "",
        voucherCode2: "",
        voucherCode3: "",
        voucherCode4: "",
        voucherCode: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const concatenatedCode = `${values.voucherCode1}${values.voucherCode2}${values.voucherCode3}${values.voucherCode4}`;

        const newCoupon = {
          id: `V${Date.now()}`,
          code: concatenatedCode,
          expiration: "2025-03-21",
          useDate: null,
          isActive: true,
        };
        setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
        setAddList(false);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="w-full relative">
          <Flex width={"100%"} gap={{ column: 8 }}>
            <Field
              name="voucherCode1"
              type="text"
              maxLength={4}
              placeholder="xxxx"
              className="focus:outline-none w-1/2 border-[1.5px] border-primary-300 rounded-[8px] px-[12px] h-[40px]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(
                  "voucherCode",
                  `${e.target.value}${values.voucherCode2}${values.voucherCode3}${values.voucherCode4}`
                );
                setFieldValue("voucherCode1", e.target.value);
              }}
            />
            <Field
              name="voucherCode2"
              type="text"
              maxLength={4}
              placeholder="xxxx"
              className="focus:outline-none w-1/2 border-[1.5px] border-primary-300 rounded-[8px] px-[12px] h-[40px]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(
                  "voucherCode",
                  `${values.voucherCode1}${e.target.value}${values.voucherCode3}${values.voucherCode4}`
                );
                setFieldValue("voucherCode2", e.target.value);
              }}
            />
            <Field
              name="voucherCode3"
              type="text"
              maxLength={4}
              placeholder="xxxx"
              className="focus:outline-none w-1/2 border-[1.5px] border-primary-300 rounded-[8px] px-[12px] h-[40px]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(
                  "voucherCode",
                  `${values.voucherCode1}${values.voucherCode2}${e.target.value}${values.voucherCode4}`
                );
                setFieldValue("voucherCode3", e.target.value);
              }}
            />
            <Field
              name="voucherCode4"
              type="text"
              maxLength={4}
              placeholder="xxxx"
              className="focus:outline-none w-1/2 border-[1.5px] border-primary-300 rounded-[8px] px-[12px] h-[40px]"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue(
                  "voucherCode",
                  `${values.voucherCode1}${values.voucherCode2}${values.voucherCode3}${e.target.value}`
                );
                setFieldValue("voucherCode4", e.target.value);
              }}
            />
          </Flex>
          <Flex className="absolute left-0 top-1/2 translate-y-[-50%]">
            <Field
              name="voucherCode"
              type="text"
              value={values.voucherCode}
              className="hidden"
            />
            <ErrorMessage
              name="voucherCode"
              component="span"
              className="text-state-R text-span1R mt-4 ml-1"
            />
          </Flex>
          <Flex
            width={"30vw"}
            gap={{ column: 8 }}
            className="ml-auto mt-[16px]"
          >
            <Button
              label="닫기"
              bgColor="BASE_B"
              font="p2B"
              type="button"
              textColor="DARK_300"
              size={32}
              onClick={() => setAddList(false)}
            />
            <Button label="등록" size={32} font="p2B" type="submit" />
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

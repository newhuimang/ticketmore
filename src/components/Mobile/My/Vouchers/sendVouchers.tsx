import * as Yup from "yup";
import { Formik, Form } from "formik";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import Flex from "@/components/Flex";
import Overlay from "@/components/Mobile/Overlay";
import useOverlay from "@/store/useOverlay";
import useFeedback from "@/store/useFeedback";

export default function MobileSendVouchers({
  title,
  data,
  onCoupon,
}: {
  title: string;
  data?: any;
  onCoupon: (newCoupon: any) => void;
}) {
  const { closeOverlay } = useOverlay();
  const feedback = useFeedback();

  const validationSchema = Yup.object({
    voucherCode: Yup.string()
      .required("필수입니다.")
      .matches(/^[a-zA-Z0-9]{16}$/, "영문, 숫자 포함 16자를 입력하세요."),
  });

  return (
    <Overlay>
      <Formik
        initialValues={{ voucherCode: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { voucherCode } = values;
          if (voucherCode) {
            const newCoupon = {
              id: "V00241115",
              code: voucherCode,
              expiration: "2025-03-21",
              useDate: null,
              isActive: true,
            };

            onCoupon(newCoupon);

            console.log(data);
            feedback.toast({
              text: "쿠폰 등록이 완료되었습니다.",
            });
            closeOverlay();
          } else {
            setFieldError("voucherCode", "코드를 확인해주세요.");
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => {
          return (
            <Form className="w-full h-[100%]">
              <Overlay.Head title={title} />
              <Overlay.Body>
                <Flex
                  width={"100%"}
                  direction="column"
                  justify="between"
                  gap={{ row: 16 }}
                  className="px-[12px] pt-[12px] h-[100%]"
                >
                  <Flex width={"100%"} gap={{ column: 8 }}>
                    <Input
                      size={40}
                      name={"voucherCode"}
                      type="text"
                      placeholder="xxxx"
                    />
                  </Flex>
                  <Flex
                    width={"100%"}
                    direction="column"
                    gap={{ row: 8 }}
                    className="bg-base-A rounded-[12px] p-[12px]"
                  >
                    <p className="text-span1R text-dark-300">
                      &#8251; 바우처 등록은 종류별로 계정당 1회만 등록 및 사용이
                      가능합니다
                    </p>
                    <p className="text-span1R text-dark-300">
                      &#8251; 등록된 바우처는 취소나 환불이 불가능하며 다른
                      계정에 재등록 및 선물이 불가합니다.
                    </p>
                    <p className="text-span1R text-dark-300">
                      &#8251; 바우처는 사용 후 자동 소멸됩니다.
                    </p>
                    <p className="text-span1R text-dark-300">
                      &#8251; 모든 바우처에는 유효 기간이 있으며, 기간 만료
                      시에는 사용하실 수 없습니다.
                    </p>
                    <p className="text-span1R text-dark-300">
                      &#8251; 바우처에에 따라 사용 가능 여부가 다르니 확인 후
                      사용하시기 바랍니다.
                    </p>
                  </Flex>
                </Flex>
              </Overlay.Body>
              <Overlay.Control>
                <Button
                  type="submit"
                  label="등록"
                  bgColor="PRIMARY_900"
                  font="p2B"
                  size={60}
                  disabled={isSubmitting || !isValid || !dirty}
                />
              </Overlay.Control>
            </Form>
          );
        }}
      </Formik>
    </Overlay>
  );
}

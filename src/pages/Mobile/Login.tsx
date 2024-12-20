import * as Yup from "yup";
import { Form, Formik, Field, FieldProps } from "formik";

import useAuth from "@/store/useAuth";
import Overlay from "@/components/Mobile/Overlay";
import Flex from "@/components/Flex";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import useOverlay from "@/store/useOverlay";
import Input from "@/components/Form/Input";

interface FormValues {
  id: string;
  pw: string;
}

export default function MobileLogin() {
  const { login } = useAuth();
  const { closeOverlay } = useOverlay();

  const validationSchema = Yup.object({
    id: Yup.string()
      .required("필수입니다.")
      .matches(/^[a-zA-Z0-9]{3,20}$/, "3~20자 사이의 영문, 숫자를 입력하세요."),
    pw: Yup.string()
      .required("필수입니다.")
      .matches(
        /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
        "8~16자 사이의 영문, 숫자, 특수문자(!, @, #, $, %, ^, &, +, =)를 입력하세요."
      ),
  });

  return (
    <Overlay>
      <Overlay.Head title="로그인" />
      <Formik<FormValues>
        initialValues={{
          id: "",
          pw: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setFieldError }) => {
          const { id, pw } = values;
          const success = await login({ id, pw });
          if (!success) {
            setFieldError("pw", "아이디나 비밀번호가 일치하지 않습니다.");
          } else {
            closeOverlay();
          }
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <>
            <Overlay.Body>
              <Flex
                width={"100%"}
                direction="column"
                gap={{ row: 16 }}
                className="py-[16px] px-[12px] "
              >
                <Flex width={"100%"} justify="between" items="center">
                  <p className="text-p1R">티켓모아에 처음 방문하시나요?</p>
                  <Button
                    variant="text"
                    label="회원가입"
                    font="p1R"
                    textColor="PRIMARY"
                  />
                </Flex>
                <Form className="w-full">
                  <Flex width={"100%"} direction="column" gap={{ row: 60 }}>
                    <Flex width={"100%"} direction="column" gap={{ row: 8 }}>
                      <Field name="id">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            size={52}
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            label="ID"
                          />
                        )}
                      </Field>
                      <Field name="pw">
                        {({ field }: FieldProps) => (
                          <Input
                            {...field}
                            size={52}
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            label="PW"
                          />
                        )}
                      </Field>
                      <Flex
                        items="center"
                        gap={{ column: 8 }}
                        className="ml-auto"
                      >
                        <button className="flex items-center text-p2R text-dark">
                          아이디찾기
                        </button>
                        <Divider type="vertical" height={10} />
                        <button className="flex items-center text-p2R text-dark">
                          비밀번호찾기
                        </button>
                      </Flex>
                    </Flex>
                  </Flex>
                </Form>
              </Flex>
            </Overlay.Body>
            <Overlay.Control>
              <Button
                type="submit"
                width="100%"
                label={
                  isSubmitting ? (
                    <Flex gap={{ column: 16 }}>
                      <div className="animate-spin h-5 w-5 border-l-[1.5px] border-t-[1.5px] rounded-full" />
                      로그인중
                    </Flex>
                  ) : (
                    "로그인"
                  )
                }
                bgColor="PRIMARY_900"
                font="p1B"
                size={60}
                disabled={isSubmitting || !isValid || !dirty}
              />
            </Overlay.Control>
          </>
        )}
      </Formik>
    </Overlay>
  );
}

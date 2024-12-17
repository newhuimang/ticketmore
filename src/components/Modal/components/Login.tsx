import { Formik, Form } from "formik";
import * as Yup from "yup";

import Flex from "@/components/Flex";
import Input from "@/components/Form/Input";
import Divider from "@/components/Divider";
import Button from "@/components/Button";
import useAuth from "@/store/useAuth";

export default function Login({ close }: { close: () => void }) {
  const { login } = useAuth();
  const validationSchema = Yup.object({
    id: Yup.string().required("필수입니다."),
    pw: Yup.string().required("필수입니다."),
  });

  return (
    <Flex
      width={"100%"}
      direction="column"
      gap={{ row: 24 }}
      className="py-[16px]"
    >
      <Flex width={"100%"} justify="between" items="center">
        <p className="text-p1R">티켓모아에 처음 방문하시나요?</p>
        <button className="flex items-center text-p2B text-primary px-[16px] h-[32px] hover:bg-base-A hover:rounded-[8px]">
          회원가입
        </button>
      </Flex>
      <Formik
        initialValues={{
          id: "",
          pw: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (login(values)) {
            close();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full">
            <Flex width={"100%"} direction="column" gap={{ row: 60 }}>
              <Flex width={"100%"} direction="column" gap={{ row: 16 }}>
                <Input
                  size={40}
                  name="id"
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  label={"ID"}
                />
                <Input
                  size={40}
                  name="pw"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  label={"pw"}
                />
                <Flex items="center" gap={{ column: 8 }} className="ml-auto">
                  <button className="flex items-center text-span1R text-dark-500">
                    아이디찾기
                  </button>
                  <Divider type="vertical" height={10} />
                  <button className="flex items-center text-span1R text-dark-500">
                    비밀번호찾기
                  </button>
                </Flex>
              </Flex>

              <Button
                type="submit"
                font="p1Bt"
                label={isSubmitting ? "잠시만 기다려주세요" : "로그인"}
                disabled={isSubmitting}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

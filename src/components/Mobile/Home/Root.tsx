import Flex from "@/components/Flex";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      width={"100%"}
      direction="column"
      gap={{ row: 24 }}
      className="px-[12px] py-[24px] bg-white shadow-key"
    >
      {children}
    </Flex>
  );
}

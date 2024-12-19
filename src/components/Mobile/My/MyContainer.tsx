import Divider from "@/components/Divider";
import Flex from "@/components/Flex";
import { ChevronRight } from "react-bootstrap-icons";

interface Container {
  label: string;
  list: Array<{
    id: string;
    icon: React.ReactNode;
    title: string;
    onClick: (e: any) => void;
  }>;
}

export default function MobileMyContainer({ list, label }: Container) {
  return (
    <Flex
      width={"100%"}
      direction="column"
      gap={{ row: 16 }}
      className="px-[12px]"
    >
      <p className="text-subtitR text-primary-900 px-[4px]">{label}</p>
      <Flex
        width={"100%"}
        direction="column"
        className="bg-white shadow-basic px-[12px] rounded-[16px]"
      >
        {list.map((item, index) => {
          return (
            <>
              <Flex
                width={"100%"}
                key={item.id}
                justify="between"
                items="center"
                onClick={item.onClick}
                className="py-[16px]"
              >
                <Flex items="center" gap={{ column: 8 }}>
                  {item.icon}
                  <p className="text-p1R">{item.title}</p>
                </Flex>

                <ChevronRight size={16} className="fill-dark-500" />
              </Flex>

              {index < list.length - 1 && <Divider color="bg-base-A" />}
            </>
          );
        })}
      </Flex>
    </Flex>
  );
}

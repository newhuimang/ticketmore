import Divider from "@/components/Divider";
import Flex from "@/components/Flex";
import useOverlay from "@/store/useOverlay";
import { ChevronRight } from "react-bootstrap-icons";

interface Container {
  label: string;
  list: Array<{
    id: string;
    icon: React.ReactNode;
    title: string;
    contents?: React.ReactNode;
  }>;
}

export default function MobileMyContainer({ list, label }: Container) {
  const { openOverlay } = useOverlay();
  return (
    <Flex width={"100%"} direction="column" gap={{ row: 8 }} className="px-[12px]">
      <p className="text-p2B text-dark-950 px-[4px]">{label}</p>
      <Flex
        width={"100%"}
        direction="column"
        gap={{ row: 8 }}
        className="bg-white shadow-basic p-[12px] rounded-[12px]"
      >
        {list.map((item, index) => {
          return (
            <>
              <Flex
                width={"100%"}
                key={item.id}
                justify="between"
                items="center"
                onClick={() => openOverlay(item.contents)}
              >
                <Flex items="center" gap={{ column: 8 }}>
                  {item.icon}
                  <p className="text-p2R">{item.title}</p>
                </Flex>

                <ChevronRight size={14} className="fill-dark-500" />
              </Flex>

              {index < list.length - 1 && <Divider color="bg-base-A" />}
            </>
          );
        })}
      </Flex>
    </Flex>
  );
}

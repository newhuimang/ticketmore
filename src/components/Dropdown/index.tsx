import { DropdownProps } from "./type";

export default function Dropdown({ menu, height = 32 }: DropdownProps) {
  return (
    <ul className="flex gap-x-[80px] px-[32px] h-fit">
      {menu.map((menuItem, i) => (
        <li
          key={i}
          className="relative group flex items-center"
          style={{ height: height }}
        >
          {menuItem.title}
          <ul className="absolute w-fit top-[100%] translate-y-[0px] left-1/2 translate-x-[-50%] text-center hidden group-hover:flex flex-col px-[16px] py-[8px] bg-[#ffffff90] backdrop-blur-[20px] shadow-feedback rounded-[16px]">
            {menuItem.list.map((listItem, index) => (
              <li key={index} className="w-full p-[8px]">
                <div className="text-p2R text-nowrap hover:text-p2B hover:text-primary cursor-pointer">
                  {listItem.content}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

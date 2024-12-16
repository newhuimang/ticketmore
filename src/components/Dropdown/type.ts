export interface DropdownProps {
  menu: {
    title: string | React.ReactNode;
    list: Array<{
      content: React.ReactNode;
    }>;
  }[];
  height?: string | number;
}

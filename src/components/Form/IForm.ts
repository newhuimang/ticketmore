interface InputProps {
  type: string;
  label?: string;
  name: string;
  value?: any;
  placeholder?: string;
  size?: 24 | 32 | 40 | 50 | 60;
  onChange?: (e: React.ChangeEvent<any>) => void;
}

export type { InputProps };

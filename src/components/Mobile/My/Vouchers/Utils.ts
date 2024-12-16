const formatData = (input: string): string => {
  const cleanInput = input.replace(/[^A-Za-z0-9]/g, "");
  return cleanInput.replace(/(.{4})(?=.)/g, "$1-");
};

const getRawValue = (formattedValue: string): string => {
  return formattedValue.replace(/-/g, "");
};

const formatNumberWithComma = (num: number) => {
  return new Intl.NumberFormat().format(num);
};

export { formatData, getRawValue, formatNumberWithComma };

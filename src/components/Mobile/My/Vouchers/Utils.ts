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

const getMaskingValues = (input: string | number): string => {
  const inputStr = input.toString();

  const cleanInput = inputStr.replace(/[^A-Za-z0-9]/g, "");
  const length = cleanInput.length;

  let maskedValue = "";

  for (let i = 0; i < length; i++) {
    if (i >= 4 && i < 12) {
      maskedValue += "*";
    } else if (i >= 12 && i < 14) {
      maskedValue += "*";
    } else {
      maskedValue += cleanInput[i];
    }

    if ((i + 1) % 4 === 0 && i < length - 1) {
      maskedValue += " - ";
    }
  }
  return maskedValue;
};

export { formatData, getRawValue, formatNumberWithComma, getMaskingValues };

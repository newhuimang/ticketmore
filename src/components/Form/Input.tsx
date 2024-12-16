import { Field, ErrorMessage } from "formik";
import { InputProps } from "./IForm";
import Flex from "../Flex";

export default function Input({
  label,
  name,
  value,
  type,
  placeholder,
  size = 32,
  onChange,
}: InputProps) {
  // const [isClicked, setIsClicked] = useState(false);
  // ${isClicked ? "border-primary" : "border-primary-100"}

  return (
    <Flex width={"100%"} direction="column">
      <Flex
        width={"100%"}
        items="center"
        gap={{ column: 8 }}
        className={`border-[1.5px] bg-white rounded-[8px] px-[12px] border-primary-100`}
        style={{ height: size }}
        // onMouseEnter={() => setIsClicked(true)}
        // onMouseLeave={() => setIsClicked(false)}
      >
        {label && (
          <label
            htmlFor={name}
            className="text-p2B text-primary-200 whitespace-nowrap"
          >
            {label}
          </label>
        )}

        <Field
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          className="w-full border-none focus:outline-none text-p2R placeholder:text-p2R"
          onChange={onChange}
        />
      </Flex>
      <ErrorMessage
        name={name}
        component="span"
        className="text-state-R text-span1R mt-1 ml-1"
      />
    </Flex>
  );
}

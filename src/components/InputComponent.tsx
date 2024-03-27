type InputComponentProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputComponent = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}: InputComponentProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border-2 border-blue-500 focus:outline-none rounded-md p-2"
    />
  );
};

export default InputComponent;

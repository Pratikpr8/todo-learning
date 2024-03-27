type InputComponentProps = {
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  className?: string;
};

const InputComponent = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  checked,
}: InputComponentProps) => {
  return (
    <input
      className={className}
      checked={checked}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;

type TextareaComponentProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextareaComponent = ({
  name,
  value,
  placeholder,
  onChange,
}: TextareaComponentProps) => {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="border-2 border-blue-500 focus:outline-none rounded-md p-6 h-30"
    />
  );
};

export default TextareaComponent;

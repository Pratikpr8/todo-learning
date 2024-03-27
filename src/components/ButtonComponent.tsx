type ButtonComponentProps = {
  text?: string;
  className: string;
  onClick?: () => void;
};

const ButtonComponent = ({
  text,
  className,
  onClick,
}: ButtonComponentProps) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonComponent;

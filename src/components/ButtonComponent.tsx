const ButtonComponent = ({ text }: { text: string }) => {
  return (
    <button className="outline-none rounded-lg p-2 bg-blue-400 text-white hover:bg-blue-500 mb-6">
      {text}
    </button>
  );
};

export default ButtonComponent;

const BaseButton = ({ children, isSelected, onClick }) => {
  return (
    <button
      className={`inline-flex items-center justify-center px-4 h-[40px] rounded-sm text-center text-white ring-2 ring-blue-600 whitespace-nowrap ${
        isSelected ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BaseButton;

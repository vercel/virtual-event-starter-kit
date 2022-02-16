const IconButton: React.FC<{ active?: boolean; onClick?: () => void }> = ({
  active = false,
  onClick,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-1 rounded-md ${
        active ? 'bg-white text-black' : 'icon-btn'
      }`}
      type="button"
    >
      {children}
    </button>
  );
};

export default IconButton;

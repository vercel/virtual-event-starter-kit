import React from 'react';

interface Props {
  active?: boolean;
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const ControlButton: React.FC<Props> = ({ active, text, children, onClick, className = '' }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onClick}
        type="button"
        className={`flex items-center justify-center w-11 h-11 rounded-full border-solid border-2 ${
          active ? 'border-gray-200' : 'border-gray-base'
        } ${className}`}
      >
        {children}
      </button>
      <span className="text-xxs mt-1">{text}</span>
    </div>
  );
};

export default ControlButton;

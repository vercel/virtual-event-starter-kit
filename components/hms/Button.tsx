import React from 'react';
import cn from 'classnames';

interface ButtonProps {
  type?: JSX.IntrinsicElements['button']['type'];
  variant?: 'secondary' | 'primary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps & JSX.IntrinsicElements['button']> = ({
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const baseClass = `flex items-center justify-center rounded-lg px-4 py-2.5 cursor-pointer disabled:cursor-not-allowed`;
  let variantClass = ``;
  if (variant === 'danger') {
    variantClass = `bg-red-500 hover:bg-red-600`;
  } else if (variant === 'secondary') {
    variantClass = `bg-gray-600 hover:bg-gray-500`;
  } else {
    variantClass = `bg-brand-300 hover:bg-brand-200`;
  }
  return (
    <button className={cn(baseClass, variantClass, className)} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;

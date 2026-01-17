import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 
                       variant === 'secondary' ? 'btn-secondary' : 'btn-text';
  
  return (
    <button 
      className={`${baseClass} ${variantClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

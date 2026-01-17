import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`feature-card ${className}`} style={{ textAlign: 'left', cursor: 'default' }}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

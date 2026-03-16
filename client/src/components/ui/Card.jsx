import React from 'react';

const Card = ({ children, className = '', padding = true }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
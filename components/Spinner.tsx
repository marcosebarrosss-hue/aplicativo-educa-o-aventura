
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-12 h-12 border-4 border-t-brand-primary border-gray-200 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-brand-text-light font-semibold">Gerando seu desafio...</p>
    </div>
  );
};

export default Spinner;

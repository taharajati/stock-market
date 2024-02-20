import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white p-8 max-w-4xl w-[80%] h-[80%] mx-auto rounded-lg shadow-lg">
        <button
          className="absolute top-0 right-0 m-4 text-xl cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

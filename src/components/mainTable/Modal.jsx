import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center justify-center">
      <div className="relative bg-white p-8 mx-4 sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full h-auto sm:h-[80%] md:h-[80%] lg:h-[80%] xl:h-[80%] rounded-lg shadow-lg">
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

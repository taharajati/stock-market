import React, { useState } from 'react';

const InfoIcon = ({ text }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseEnter = () => setShowPopup(true);
  const handleMouseLeave = () => setShowPopup(false);

  return (
    <div className="relative inline-block">
      {/* Circle with "?" Icon */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-8 h-8 rounded-full  text-white flex items-center justify-center cursor-pointer text-xs"
      >
        ?
      </div>

      {/* Popup Box */}
      {showPopup && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50 w-96 mt-2">
          <p className="text-black">{text}</p>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;

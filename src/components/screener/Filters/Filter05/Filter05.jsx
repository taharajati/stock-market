import React, { useState } from 'react';

const Filter05 = ({ onFilterChange }) => {
  const [minVolume, setMinVolume] = useState(1);

  const handleCheckboxChange = () => {
    // Toggle minVolume between 0 and 1
    setMinVolume(minVolume === 0 ? 1 : 0);
  };

  return (
    <div className='text-right flex items-center justify-end mb-3    ml-auto'>
      <label>
        <input
          type="checkbox"
          checked={minVolume === 0}
          onChange={handleCheckboxChange}
        />
        فقط نمادهای معامله شده
      </label>
      {/* You can use minVolume in your component logic or send it to other components */}
    </div>
  );
};

export default Filter05;

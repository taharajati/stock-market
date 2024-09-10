import React from 'react';
import InfoIcon from './InfoIcon'; // Import the InfoIcon component
import '../../../output.css'; // Import your CSS file

const SortableTableHeader = ({ column, criteria, order, onSort }) => {
  const handleClick = (event) => {
    event.stopPropagation(); // Prevents clicks inside the InfoIcon from propagating to the <th> element
    onSort(column.fieldName); // Use the English name for sorting
  };

  return (
    <th
      className="table-header py-2 px-4 cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <span>
            {column.farsiName || column.fieldName}
            {criteria === column.fieldName && (
              <span className="ml-1">{order === 'asc' ? ' 🔽 ' : ' 🔼 '}</span>
            )}
          </span>
          <div className="info-icon-container mt-2 border border-gray-300 rounded-full p-1 w-4 h-4 flex items-center justify-center mx-1">
          <InfoIcon text="این یک توضیح است" />
        </div>
        </div>
      </div>
    </th>
  );
};

export default SortableTableHeader;

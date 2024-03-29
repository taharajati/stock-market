import React from 'react';

const SortableTableHeader = ({ column, criteria, order, onSort }) => {
  const handleClick = () => {
    onSort(column.fieldName); // Use the English name for sorting
  };

  return (
    <th
      className="py-2 px-4 border border-[#343434] cursor-pointer"
      onClick={handleClick}
    >
      {column.farsiName || column.fieldName}
      {criteria === column.fieldName && (
        <span className="ml-1">{order === 'asc' ? '🔽' : '🔼'}</span>
      )}
    </th>
  );
};


export default SortableTableHeader;

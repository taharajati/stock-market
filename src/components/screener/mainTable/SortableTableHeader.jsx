import React from 'react';
import InfoIcon from './InfoIcon'; // Import the InfoIcon component
import '../../../output.css'; // Import your CSS file


const SortableTableHeader = ({ column, criteria, order, onSort }) => {
  const handleClick = () => {
    onSort(column.fieldName); // Use the English name for sorting
  };

  return (
    <th
      className="table-header py-2 px-4  cursor-pointer"
      onClick={handleClick}
    >

      {column.farsiName || column.fieldName}
      {criteria === column.fieldName && (
        <span className="ml-1">{order === 'asc' ? ' 🔽 ' : ' 🔼 '}</span>



      )}
      <div className="info-icon-container">
      <InfoIcon
           text={'این یک است است'}
         />
         </div>


    </th>
  );
};


export default SortableTableHeader;

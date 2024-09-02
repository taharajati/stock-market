import React from 'react';

const SortableColumnHeader = ({ column, getSortByToggleProps }) => (
  <th {...column.getHeaderProps(getSortByToggleProps())} className="py-2 px-4  cursor-pointer">
    {column.render('Header')}
    {column.isSorted ? (
      column.isSortedDesc ? ' ▼' : ' ▲'
    ) : null}
  </th>
);

export default SortableColumnHeader;
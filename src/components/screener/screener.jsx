import React from 'react';
import React, { useState } from 'react';
import MyTable from './mainTable/MyTable';
import Filter01 from './Filters/Filter01/Filter01';
import Filter02 from './Filters/Filter02/Filter02';
import Filter04 from './Filters/Filter04/Filter04';
import DateFilter from './Filters/datefilter/DateFilter';
import MyChart from '../charts/MyChart';
import Nav from '../nav/Nav';

const Dashboard = () => {
    const [filterValues, setFilterValues] = useState({
        filter01: '',
        filter02: '', // Add filter02 state
        startDate: null,
        endDate: null,
        filter04: '',
        filter05: 1,
      });

      const handleFilter02Change = (value) => {
        setFilterValues({ ...filterValues, filter02: value });
      };

      const handleDateFilterChange = (dateFilterValues) => {
        setFilterValues({ ...filterValues, ...dateFilterValues });
      };

      const handleFilter04Change = (optionType) => {
        setFilterValues({ ...filterValues, filter04: optionType });
        console.log('Filter04 Value:', optionType);
      };
    return (
    <>

      <Nav />

      <Filter01 setFilterValue={(value) => setFilterValues({ ...filterValues, filter01: value })} />
      <Filter02 onFilterChange={handleFilter02Change} />
      <Filter04 onFilterChange={handleFilter04Change} />


      <DateFilter onFilterChange={handleDateFilterChange} />


      <MyTable filterValues={filterValues} />
    </>
  );
  }

export default Dashboard;

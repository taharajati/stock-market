import React, { useState } from 'react';
import MyTable from './mainTable/MyTable';
import Filter01 from './Filters/Filter01/Filter01';
import Filter02 from './Filters/Filter02/Filter02';
import Filter04 from './Filters/Filter04/Filter04';
import DateFilter from './Filters/datefilter/DateFilter';
import Filter06 from './Filters/Filter06/Filter06';

const Dashboard = () => {
    const [filterValues, setFilterValues] = useState({
        filter01: '',
        filter02: '',
        dueDate: '', // Updated to include dueDate
        filter04: '',
        filter06: 1,
    });

    const [dropdownOpen, setDropdownOpen] = useState(true); // Dropdown state

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

    const handleFilter06Change = (value) => {
        setFilterValues({ ...filterValues, filter06: value });
    };



    return (
        <>
             
                    <div className=''>
            <div className='  float-right mx-6  rounded-lg scale-105  text-black p-3   '>
                {dropdownOpen && (
                    <div className="filter-dropdown mt-12 ">
                            <Filter01 setFilterValue={(value) => setFilterValues({ ...filterValues, filter01: value })} />

                            <Filter02 onFilterChange={handleFilter02Change} />

                            <Filter04 onFilterChange={handleFilter04Change} />

                            <Filter06 value={filterValues.filter06} onFilterChange={handleFilter06Change} />

                            <DateFilter onFilterChange={handleDateFilterChange} />
                    </div>
                )}
                
            </div>
            <br />
            <br />
            <br />
            <br />
     
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
           
<br />
            <div className=' float-end  '>

             <MyTable filterValues={filterValues} />
             </div>
            </div>
        </>
    );
};

export default Dashboard;

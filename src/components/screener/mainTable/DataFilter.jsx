import React from 'react';

const DataFilter = ({ intradata, filterValues, columns, parseDate }) => {
    // Filter the intradata based on filterValues
    const filteredData = intradata.filter((item) => {
        // Check filter01
        if (filterValues.filter01 && item.ua_instrument_id.toString().toLowerCase() !== filterValues.filter01.toString().toLowerCase()) {
            console.log(`ua_instrument_id Filter: ${item.ua_instrument_id} !== ${filterValues.filter01}`);
            return false;
        }

        // Check filter02
        if (filterValues.filter02 && item.option_status.toLowerCase() !== filterValues.filter02.toLowerCase()) {
            console.log(`Filter02: ${item.option_status} !== ${filterValues.filter02}`);
            return false;
        }

        // Check option type filter (filter04)
        if (filterValues.filter04 && item.option_type.toLowerCase().includes(filterValues.filter04.toLowerCase())) {
            console.log(`Option type Filter: ${item.option_type} does not include ${filterValues.filter04}`);
            console.log('Item Option Type:', item.option_type);
            console.log('Filter04 Value:', filterValues.filter04);

            return false;
        }

        // Check volume filter (filter06)
        if (filterValues.filter06 && item.volume <= filterValues.filter06) {
            return false;
        }

        // Check due date filter
        if (filterValues.dueDate && item.days_to_maturity_fa !== filterValues.dueDate) {
            return false;
        }

        return true;
    });

    return filteredData;
};

export default DataFilter;

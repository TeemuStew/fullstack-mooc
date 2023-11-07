// Filtteröintilomake (Filter.js)
import React from 'react';

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Filter shown with: <input
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Filter;
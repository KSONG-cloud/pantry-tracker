import React from 'react';

export default function SortControl({ sortOption, setSortOption, sortOrder, setSortOrder }) {
  return (
    <div className='sort-container'>
      <div className='sort-section'>
        <label htmlFor='sort'>Sort by: </label>
        <select 
          id='sort' 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className='sort-select'
        >
          <option value="urgency">Urgency</option>
          <option value="type">Type</option>
          <option value="addedDate">Time Added</option>
        </select>

        <div 
          className="sort-toggle" 
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
        >
          <span className={`arrow-up ${sortOrder === 'asc' ? 'active' : 'inactive'}`}>▲</span>
          <span className={`arrow-down ${sortOrder === 'desc' ? 'active' : 'inactive'}`}>▼</span>
        </div>
      </div>
    </div>
  );
}

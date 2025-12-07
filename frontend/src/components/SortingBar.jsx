import React from 'react';

export default function SortingBar({ sortBy, sortOrder, onChange }) {
  function handleSortByChange(e) {
    onChange({
      sortBy: e.target.value || null,
      sortOrder: sortOrder
    });
  }

  function handleOrderChange(e) {
    onChange({
      sortBy,
      sortOrder: e.target.value || 'asc'
    });
  }

  return (
    <div className="card" style={{ marginBottom: '10px' }}>
      <div className="card-header">
        <h2>Sorting</h2>
      </div>
      <div className="filters-row">
        <div>
          <div className="field-label">Sort By</div>
          <select className="select" value={sortBy || ''} onChange={handleSortByChange}>
            <option value="">Default (Date - Newest)</option>
            <option value="date">Date</option>
            <option value="quantity">Quantity</option>
            <option value="customerName">Customer Name (A–Z)</option>
          </select>
        </div>
        <div>
          <div className="field-label">Order</div>
          <select className="select" value={sortOrder} onChange={handleOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}

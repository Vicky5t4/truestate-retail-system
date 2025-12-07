import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Search</h2>
      </div>
      <input
        className="input"
        type="text"
        placeholder="Search by customer name or phone number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

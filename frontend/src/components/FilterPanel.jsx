import React, { useState } from 'react';

function MultiInput({ label, placeholder, value, onChange }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="chips">
        {value
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean)
          .map((v) => (
            <span className="chip" key={v}>
              {v}
              <span
                onClick={() => {
                  const parts = value
                    .split(',')
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .filter((p) => p !== v);
                  onChange(parts.join(','));
                }}
              >
                ×
              </span>
            </span>
          ))}
      </div>
    </div>
  );
}

export default function FilterPanel({ filters, onFiltersChange, onClear }) {
  const [local, setLocal] = useState(filters);

  function updateField(field, value) {
    const next = { ...local, [field]: value };
    setLocal(next);
    onFiltersChange(next);
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Filters</h2>
        <button className="button secondary" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="filters-grid">
        <MultiInput
          label="Customer Region"
          placeholder="e.g. North, South"
          value={local.region || ''}
          onChange={(v) => updateField('region', v)}
        />

        <MultiInput
          label="Gender"
          placeholder="e.g. Male, Female"
          value={local.gender || ''}
          onChange={(v) => updateField('gender', v)}
        />

        <div className="filters-row">
          <div>
            <div className="field-label">Age Min</div>
            <input
              className="input"
              type="number"
              value={local.ageMin ?? ''}
              onChange={(e) => updateField('ageMin', e.target.value)}
              placeholder="Min"
            />
          </div>
          <div>
            <div className="field-label">Age Max</div>
            <input
              className="input"
              type="number"
              value={local.ageMax ?? ''}
              onChange={(e) => updateField('ageMax', e.target.value)}
              placeholder="Max"
            />
          </div>
        </div>

        <MultiInput
          label="Product Category"
          placeholder="e.g. Electronics, Grocery"
          value={local.productCategory || ''}
          onChange={(v) => updateField('productCategory', v)}
        />

        <MultiInput
          label="Tags"
          placeholder="e.g. New, Discount"
          value={local.tags || ''}
          onChange={(v) => updateField('tags', v)}
        />

        <MultiInput
          label="Payment Method"
          placeholder="e.g. Cash, Card, UPI"
          value={local.paymentMethod || ''}
          onChange={(v) => updateField('paymentMethod', v)}
        />

        <div className="filters-row">
          <div>
            <div className="field-label">Date From</div>
            <input
              className="input"
              type="date"
              value={local.dateFrom || ''}
              onChange={(e) => updateField('dateFrom', e.target.value)}
            />
          </div>
          <div>
            <div className="field-label">Date To</div>
            <input
              className="input"
              type="date"
              value={local.dateTo || ''}
              onChange={(e) => updateField('dateTo', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

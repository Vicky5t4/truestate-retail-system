import React, { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import SortingBar from './components/SortingBar.jsx';
import SalesTable from './components/SalesTable.jsx';
import PaginationControls from './components/PaginationControls.jsx';
import NoResults from './components/NoResults.jsx';
import { useSalesData } from './hooks/useSalesData.js';

export default function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    gender: '',
    ageMin: '',
    ageMax: '',
    productCategory: '',
    tags: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: ''
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: '',
    sortOrder: 'desc'
  });
  const [page, setPage] = useState(1);

  const queryParams = useMemo(() => {
    const params = {
      search: search || undefined,
      sortBy: sortConfig.sortBy || undefined,
      sortOrder: sortConfig.sortOrder || undefined,
      page,
      limit: 10
    };

    const { region, gender, ageMin, ageMax, productCategory, tags, paymentMethod, dateFrom, dateTo } =
      filters;

    if (region) params.region = region;
    if (gender) params.gender = gender;
    if (ageMin) params.ageMin = ageMin;
    if (ageMax) params.ageMax = ageMax;
    if (productCategory) params.productCategory = productCategory;
    if (tags) params.tags = tags;
    if (paymentMethod) params.paymentMethod = paymentMethod;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;

    return params;
  }, [search, filters, sortConfig, page]);

  const { data, totalPages, totalItems, limit, loading, error } = useSalesData(queryParams);

  function handleFiltersChange(nextFilters) {
    setFilters(nextFilters);
    setPage(1); // reset to first page on filter change
  }

  function handleClearFilters() {
    const cleared = {
      region: '',
      gender: '',
      ageMin: '',
      ageMax: '',
      productCategory: '',
      tags: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(cleared);
    setPage(1);
  }

  function handleSortChange(nextSort) {
    setSortConfig(nextSort);
    setPage(1);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handlePageChange(nextPage) {
    setPage(nextPage);
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Retail Sales Management</h1>
        <p>
          Explore customer transactions with powerful search, filters, sorting, and pagination.
        </p>
      </div>

      <SearchBar value={search} onChange={handleSearchChange} />

      <div className="layout">
        <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} onClear={handleClearFilters} />

        <div>
          <SortingBar
            sortBy={sortConfig.sortBy}
            sortOrder={sortConfig.sortOrder}
            onChange={handleSortChange}
          />

          {loading && (
            <div className="card" style={{ marginTop: '10px' }}>
              <p>Loading data...</p>
            </div>
          )}

          {error && (
            <div className="card" style={{ marginTop: '10px', color: '#b91c1c' }}>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <>
              <SalesTable data={data} />
              <PaginationControls
                page={page}
                totalPages={totalPages}
                totalItems={totalItems}
                limit={limit}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {!loading && !error && data.length === 0 && <NoResults />}
        </div>
      </div>
    </div>
  );
}

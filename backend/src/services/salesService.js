import { applySearch, applyFilters } from '../utils/filterUtils.js';
import { applySorting } from '../utils/sortUtils.js';
import { applyPagination } from '../utils/paginationUtils.js';

let salesData = [];

export function setSalesData(data) {
  salesData = data || [];
}

export function getSalesData() {
  return salesData;
}

export function querySales(options) {
  const {
    search,
    filters = {},
    sortBy,
    sortOrder,
    page,
    limit
  } = options;

  let result = [...salesData];

  // 1. Search
  result = applySearch(result, search);

  // 2. Filters
  result = applyFilters(result, filters);

  // 3. Sorting
  let effectiveSortBy = sortBy;
  let effectiveSortOrder = sortOrder;

  if (!effectiveSortBy) {
    // Default: sort by date newest first if date exists
    effectiveSortBy = 'date';
    effectiveSortOrder = 'desc';
  }

  result = applySorting(result, effectiveSortBy, effectiveSortOrder);

  // 4. Pagination
  const pageResult = applyPagination(result, page, limit);

  return {
    ...pageResult,
    sortBy: effectiveSortBy,
    sortOrder: effectiveSortOrder
  };
}

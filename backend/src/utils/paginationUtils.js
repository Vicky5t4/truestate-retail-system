export function applyPagination(records, page = 1, limit = 10) {
  const totalItems = records.length;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * safeLimit;
  const end = start + safeLimit;
  const data = records.slice(start, end);

  return {
    data,
    page: currentPage,
    totalPages,
    totalItems,
    limit: safeLimit
  };
}

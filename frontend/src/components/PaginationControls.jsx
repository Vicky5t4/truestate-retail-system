import React from 'react';

export default function PaginationControls({
  page,
  totalPages,
  totalItems,
  limit,
  onPageChange
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const start = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  return (
    <>
      <div className="pagination">
        <div className="pagination-controls">
          <button
            className="button secondary"
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange(page - 1)}
          >
            Previous
          </button>
          <button
            className="button"
            disabled={!canNext}
            onClick={() => canNext && onPageChange(page + 1)}
          >
            Next
          </button>
        </div>
        <div>
          Page {page} of {totalPages}
        </div>
      </div>
      <div className="status-bar">
        Showing {start}–{end} of {totalItems} records
      </div>
    </>
  );
}

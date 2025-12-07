export function applySorting(records, sortBy, sortOrder = 'asc') {
  if (!sortBy) return records;

  const dir = sortOrder === 'desc' ? -1 : 1;
  const sorted = [...records];

  sorted.sort((a, b) => {
    let av, bv;

    switch (sortBy) {
      case 'date':
        av = a.date ? a.date.getTime() : 0;
        bv = b.date ? b.date.getTime() : 0;
        break;
      case 'quantity':
        av = a.quantity ?? 0;
        bv = b.quantity ?? 0;
        break;
      case 'customerName':
        av = (a.customerName || '').toLowerCase();
        bv = (b.customerName || '').toLowerCase();
        break;
      default:
        return 0;
    }

    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });

  return sorted;
}

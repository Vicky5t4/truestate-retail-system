export function applySearch(records, search) {
  if (!search) return records;
  const term = search.toLowerCase();
  return records.filter((r) => {
    const name = (r.customerName || '').toLowerCase();
    const phone = (r.phoneNumber || '').toLowerCase();
    return name.includes(term) || phone.includes(term);
  });
}

function normalizeArrayParam(param) {
  if (!param) return [];
  if (Array.isArray(param)) return param.filter(Boolean);
  if (typeof param === 'string') {
    return param.split(',').map((v) => v.trim()).filter(Boolean);
  }
  return [];
}

export function applyFilters(records, filters) {
  let result = [...records];

  const regions = normalizeArrayParam(filters.region);
  const genders = normalizeArrayParam(filters.gender);
  const categories = normalizeArrayParam(filters.productCategory);
  const tags = normalizeArrayParam(filters.tags);
  const paymentMethods = normalizeArrayParam(filters.paymentMethod);

  const ageMin = filters.ageMin != null ? Number(filters.ageMin) : null;
  const ageMax = filters.ageMax != null ? Number(filters.ageMax) : null;
  const dateFrom = filters.dateFrom ? new Date(filters.dateFrom) : null;
  const dateTo = filters.dateTo ? new Date(filters.dateTo) : null;

  if (regions.length) {
    result = result.filter((r) => r.customerRegion && regions.includes(r.customerRegion));
  }

  if (genders.length) {
    result = result.filter((r) => r.gender && genders.includes(r.gender));
  }

  if (categories.length) {
    result = result.filter((r) => r.productCategory && categories.includes(r.productCategory));
  }

  if (paymentMethods.length) {
    result = result.filter((r) => r.paymentMethod && paymentMethods.includes(r.paymentMethod));
  }

  if (tags.length) {
    result = result.filter((r) => {
      if (!r.tags || !r.tags.length) return false;
      // at least one selected tag should be present
      return tags.some((t) => r.tags.includes(t));
    });
  }

  if (ageMin != null || ageMax != null) {
    result = result.filter((r) => {
      if (r.age == null) return false;
      if (ageMin != null && r.age < ageMin) return false;
      if (ageMax != null && r.age > ageMax) return false;
      return true;
    });
  }

  if (dateFrom || dateTo) {
    result = result.filter((r) => {
      if (!r.date) return false;
      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;
      return true;
    });
  }

  return result;
}

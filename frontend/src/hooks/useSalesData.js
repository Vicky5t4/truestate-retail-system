import { useEffect, useState } from 'react';
import { fetchSales } from '../services/api.js';

export function useSalesData(queryParams) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Whenever queryParams.page changes, set local page
  useEffect(() => {
    if (queryParams.page) {
      setPage(queryParams.page);
    }
  }, [queryParams.page]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchSales(queryParams);
        if (response.success) {
          setData(response.data || []);
          setPage(response.page || 1);
          setTotalPages(response.totalPages || 1);
          setTotalItems(response.totalItems || 0);
          setLimit(response.limit || 10);
        } else {
          setError(response.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [JSON.stringify(queryParams)]);

  return {
    data,
    page,
    totalPages,
    totalItems,
    limit,
    loading,
    error
  };
}

import { querySales } from '../services/salesService.js';

export function getSales(req, res) {
  try {
    const {
      search,
      sortBy,
      sortOrder,
      page,
      limit,
      region,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateFrom,
      dateTo
    } = req.query;

    const filters = {
      region,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateFrom,
      dateTo
    };

    const result = querySales({
      search,
      filters,
      sortBy,
      sortOrder,
      page,
      limit
    });

    res.json({
      success: true,
      ...result
    });
  } catch (err) {
    console.error('[salesController] Error querying sales', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

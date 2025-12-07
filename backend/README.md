Backend - TruEstate Retail Sales Management System
=================================================

This folder contains the Node.js/Express backend for the Retail Sales Management System.

- Loads the CSV dataset into memory at startup.
- Exposes a single `/api/sales` endpoint for search, filtering, sorting, and pagination.
- Keeps all business logic in services and utilities for maintainability.

To run:
1. Place the dataset as `backend/data/sales_data.csv`.
2. `cd backend`
3. `npm install`
4. `npm run dev`

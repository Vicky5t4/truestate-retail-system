# TruEstate Retail Sales Management System - Architecture

## 1. Backend Architecture

**Tech:** Node.js, Express, csv-parse

The backend is a lightweight API layer responsible for:
- Loading the sales dataset from a CSV file into memory at startup.
- Applying all **search**, **filter**, **sort**, and **pagination** logic in a single place.
- Exposing a clean REST endpoint for the frontend.

### 1.1 Data Loading

- `src/utils/csvLoader.js`
  - Uses `csv-parse` to load `data/sales_data.csv`.
  - Normalises numeric fields like quantity, price, discount, totals.
  - Parses the date column into a JavaScript `Date` object.
  - Splits the `Tags` column into a string array.
  - Returns an array of `SaleRecord` objects.

- `src/services/salesService.js`
  - `setSalesData(data)` stores the loaded dataset in-memory.
  - `getSalesData()` exposes the in-memory collection if needed elsewhere.

### 1.2 Request Handling Flow

1. Client calls `GET /api/sales` with optional query params.
2. Request hits `src/routes/salesRoutes.js`.
3. `salesRoutes` delegates to `getSales` in `src/controllers/salesController.js`.
4. Controller extracts:
   - `search` text
   - Filters (region, gender, age range, category, tags, payment method, date range)
   - Sorting (sortBy, sortOrder)
   - Pagination (page, limit)
5. Controller calls `querySales()` in `salesService` with a single options object.

### 1.3 Business Logic (Service + Utils)

- `src/services/salesService.js`
  - Orchestrates the pipeline:
    - `applySearch()`
    - `applyFilters()`
    - `applySorting()`
    - `applyPagination()`
  - Returns:
    - `data` (paginated slice)
    - `page`, `totalPages`, `totalItems`
    - `sortBy`, `sortOrder`
    - `limit`

- `src/utils/filterUtils.js`
  - `applySearch(records, search)`
    - Full-text, case-insensitive search on `customerName` and `phoneNumber`.
  - `applyFilters(records, filters)`
    - Multi-select / range filters:
      - `region`, `gender`, `productCategory`, `tags`, `paymentMethod`
      - `ageMin` / `ageMax`
      - `dateFrom` / `dateTo`
    - All filters are optional and composable.
    - Invalid numeric ranges simply yield zero results, but no server error.

- `src/utils/sortUtils.js`
  - `applySorting(records, sortBy, sortOrder)`
    - Supported sort keys:
      - `date` (default, newest first / `desc`)
      - `quantity`
      - `customerName` (A–Z)
    - Handles missing data safely by falling back to 0 or empty string.

- `src/utils/paginationUtils.js`
  - `applyPagination(records, page, limit)`
    - Calculates `totalItems`, `totalPages`, and a safe `currentPage`.
    - Returns the slice for the requested page.

### 1.4 Folder Structure (Backend)

- `src/index.js` – Entry point, sets up Express, CORS, routes, and loads CSV.
- `src/controllers/` – Request/response mapping.
- `src/services/` – Business logic, data querying pipeline.
- `src/utils/` – Shared helpers for parsing, filtering, sorting, pagination.
- `src/routes/` – Express route definitions.
- `src/models/` – Model documentation (shape of `SaleRecord`).

## 2. Frontend Architecture

**Tech:** React, Vite, Axios

The frontend is a single-page React application focused on:
- A clean and minimal layout aligned with the assignment’s Figma.
- Predictable state management for search, filters, sorting, and pagination.
- Delegating all heavy logic to the backend.

### 2.1 High-Level Components

- `App.jsx`
  - Owns global UI state:
    - `search` term
    - `filters` object
    - `sortConfig` object
    - `page` number
  - Builds a `queryParams` object passed to `useSalesData`.
  - Renders:
    - `SearchBar`
    - `FilterPanel`
    - `SortingBar`
    - `SalesTable`
    - `PaginationControls`
    - `NoResults` / error / loading states

- `components/SearchBar.jsx`
  - Simple input to update the `search` term.
  - Resets to page 1 when search changes.

- `components/FilterPanel.jsx`
  - Inputs for region, gender, age range, product category, tags, payment method, date range.
  - Uses a small multi-input pattern for comma-separated multi-select filters.
  - Emits `onFiltersChange` with a single filters object.

- `components/SortingBar.jsx`
  - Dropdown for `sortBy` and `sortOrder`.
  - Allows user to choose:
    - Default (date desc)
    - Date
    - Quantity
    - Customer Name (A–Z)

- `components/SalesTable.jsx`
  - Displays a table of transactions:
    - Date, customer, phone, region, product, category, quantity, final amount, payment, status, store.
  - Uses small badges for order status (Completed, Pending, others).

- `components/PaginationControls.jsx`
  - Handles Next/Previous buttons.
  - Displays current page, total pages, and record range.

- `components/NoResults.jsx`
  - Displayed when there are zero records for the current query.

### 2.2 Data Fetching & State

- `hooks/useSalesData.js`
  - Accepts `queryParams` (built in `App`).
  - Calls `fetchSales` (Axios) whenever query params change.
  - Returns:
    - `data`, `page`, `totalPages`, `totalItems`, `limit`
    - `loading`, `error`
  - Uses a JSON string of `queryParams` in the dependency array to ensure updates only when values change.

- `services/api.js`
  - `fetchSales(params)` wraps Axios GET call to `${VITE_API_BASE_URL || 'http://localhost:4000'}/api/sales`.

### 2.3 Folder Structure (Frontend)

- `src/components/`
  - Presentational components for search, filters, sorting, table, pagination.
- `src/hooks/`
  - Custom React hooks for data fetching (`useSalesData`).
- `src/services/`
  - API clients (Axios).
- `src/styles/`
  - `global.css` contains simple, minimal styling aligned with the required layout.
- `src/App.jsx`
  - Main page and composition root.
- `src/main.jsx`
  - React entry point.

## 3. Data Flow

1. **User Interaction**
   - User types into search, selects filters, adjusts sorting, or changes the page.
   - `App` updates its local state (`search`, `filters`, `sortConfig`, `page`).

2. **Building Query Params**
   - `App` builds a `queryParams` object from the state.
   - This object contains only relevant keys for active search/filters/sorting.

3. **API Request**
   - `useSalesData(queryParams)` calls `fetchSales(queryParams)`.
   - Axios sends `GET /api/sales` with query parameters.

4. **Backend Processing**
   - Controller parses query params into search, filters, sorting, and pagination options.
   - Service runs the pipeline:
     - search → filters → sort → paginate.
   - Returns JSON with `data`, `page`, `totalPages`, `totalItems`, `limit`.

5. **Rendering UI**
   - Frontend receives the response and updates local state.
   - `SalesTable` displays the data table.
   - `PaginationControls` show page info based on `page`, `totalPages`, `totalItems`.

## 4. Module Responsibilities (Summary)

- **Backend**
  - `index.js` – start server, wire middleware, load CSV, mount routes.
  - `routes/salesRoutes.js` – define `/api/sales` route.
  - `controllers/salesController.js` – translate HTTP request into service call.
  - `services/salesService.js` – orchestrate query pipeline on in-memory dataset.
  - `utils/csvLoader.js` – load and normalize CSV data.
  - `utils/filterUtils.js` – search and filters.
  - `utils/sortUtils.js` – sorting logic.
  - `utils/paginationUtils.js` – pagination helper.
  - `models/saleRecord.js` – documents the record structure.

- **Frontend**
  - `App.jsx` – UI shell, state management, and query param construction.
  - `components/*.jsx` – reusable UI elements (search, filter, sorting, table, pagination).
  - `hooks/useSalesData.js` – data fetching and loading/error handling.
  - `services/api.js` – API wrapper for backend communication.
  - `styles/global.css` – layout and base styling.

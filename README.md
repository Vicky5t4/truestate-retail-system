TruEstate Retail Sales Management System
========================================

1. Overview (3–5 lines)
This project is a full-stack Retail Sales Management System built for the TruEstate SDE Intern assignment. 
It allows users to explore sales transactions with powerful search, multi-select filters, sorting, and pagination. 
The system is designed with a clean separation between backend and frontend, mirroring production-like architecture.
It works on top of the provided sales CSV dataset (to be placed in the backend `/data` folder).

2. Tech Stack
- Backend: Node.js, Express
- Frontend: React, Vite
- Data: CSV file parsed in-memory on server start
- HTTP: REST API using JSON

3. Search Implementation Summary
Search is implemented on the backend as a full-text, case-insensitive match on `Customer Name` and `Phone Number`. 
The frontend sends a `search` query parameter, which the backend applies before filters, sorting, and pagination. 
Search coexists seamlessly with active filters and sorting.

4. Filter Implementation Summary
Filters are implemented purely on the backend to avoid duplicated logic. 
Supported filters include region, gender, age range, product category, tags, payment method, and date range. 
Each filter can be used on its own or combined with others by passing query parameters from the frontend.

5. Sorting Implementation Summary
Sorting is handled centrally in the backend service using a single sort utility. 
Supported sort keys are `date` (newest first by default), `quantity`, and `customerName` (A–Z). 
Sorting is always applied after search and filters and respects the current filtered dataset.

6. Pagination Implementation Summary
Pagination is implemented using `page` and `limit` parameters (with a default page size of 10). 
The backend returns the current page, total items, and total pages, and the frontend renders Next/Previous controls. 
All active search, filter, and sort parameters are preserved when navigating between pages.

7. Setup Instructions
- Backend:
  1. `cd backend`
  2. Place the provided CSV dataset as `data/sales_data.csv` (create the `data` folder if needed).
  3. Run `npm install`
  4. Run `npm run dev` (or `npm start`) to start the API server on `http://localhost:4000`.
- Frontend:
  1. Open a new terminal and `cd frontend`
  2. Run `npm install`
  3. Run `npm run dev` to start the Vite dev server (default `http://localhost:5173`).
- Open the frontend URL in your browser. 
  Ensure the backend is running so the frontend can fetch data from `http://localhost:4000/api/sales`.

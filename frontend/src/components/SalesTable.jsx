import React from 'react';

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString();
}

export default function SalesTable({ data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>Transactions</h2>
      </div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Region</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Final Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Store</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td>{formatDate(row._rawDate || row.date)}</td>
                <td>{row.customerName}</td>
                <td>{row.phoneNumber}</td>
                <td>{row.customerRegion}</td>
                <td>{row.productName}</td>
                <td>{row.productCategory}</td>
                <td>{row.quantity}</td>
                <td>{row.finalAmount}</td>
                <td>{row.paymentMethod}</td>
                <td>
                  <span
                    className={
                      'badge ' +
                      (row.orderStatus === 'Completed'
                        ? 'green'
                        : row.orderStatus === 'Pending'
                        ? 'yellow'
                        : 'red')
                    }
                  >
                    {row.orderStatus}
                  </span>
                </td>
                <td>{row.storeLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

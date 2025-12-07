import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

const DATA_FILE_PATH = path.join(process.cwd(),  'data', 'sales_data.csv');

function parseNumber(value) {
  const num = Number(value);
  return Number.isNaN(num) ? null : num;
}

function parseDate(value) {
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export async function loadSalesData() {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      console.warn('[csvLoader] Data file not found at', DATA_FILE_PATH);
      resolve([]);
      return;
    }

    const records = [];
    fs.createReadStream(DATA_FILE_PATH)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (row) => {
        const record = {
          customerId: row['Customer ID'],
          customerName: row['Customer Name'],
          phoneNumber: row['Phone Number'],
          gender: row['Gender'],
          age: parseNumber(row['Age']),
          customerRegion: row['Customer Region'],
          customerType: row['Customer Type'],

          productId: row['Product ID'],
          productName: row['Product Name'],
          brand: row['Brand'],
          productCategory: row['Product Category'],
          tags: row['Tags'] ? row['Tags'].split('|').map(t => t.trim()).filter(Boolean) : [],

          quantity: parseNumber(row['Quantity']),
          pricePerUnit: parseNumber(row['Price per Unit']),
          discountPercentage: parseNumber(row['Discount Percentage']),
          totalAmount: parseNumber(row['Total Amount']),
          finalAmount: parseNumber(row['Final Amount']),

          date: parseDate(row['Date']),
          paymentMethod: row['Payment Method'],
          orderStatus: row['Order Status'],
          deliveryType: row['Delivery Type'],
          storeId: row['Store ID'],
          storeLocation: row['Store Location'],
          salespersonId: row['Salesperson ID'],
          employeeName: row['Employee Name'],
          _rawDate: row['Date'] // keep original for display if needed
        };
        records.push(record);
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        console.log(`[csvLoader] Loaded ${records.length} sales records`);
        resolve(records);
      });
  });
}

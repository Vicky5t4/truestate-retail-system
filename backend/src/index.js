import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes.js';
import { loadSalesData } from './utils/csvLoader.js';
import { setSalesData } from './services/salesService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sales API
app.use('/api/sales', salesRoutes);

async function start() {
  try {
    const data = await loadSalesData();
    setSalesData(data);

    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to load data or start server', err);
    process.exit(1);
  }
}

start();

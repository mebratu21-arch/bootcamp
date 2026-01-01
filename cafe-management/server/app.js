import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/orders.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// APIs
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

export default app;

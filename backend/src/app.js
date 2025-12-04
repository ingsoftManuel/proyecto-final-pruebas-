const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Configurar CORS para producción
const corsOptions = {
  origin: [
    'http://localhost:3001',
    'https://inventory-frontend.onrender.com',
    /\.onrender\.com$/
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Inventory Management API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      categories: '/api/categories',
      products: '/api/products'
    }
  });
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

module.exports = app;
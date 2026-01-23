const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const { incrementVisitorCount } = require('./data/mockDb');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Visitor Tracker Middleware
app.use((req, res, next) => {
    if (req.method === 'GET' && req.url.startsWith('/api/products')) {
        incrementVisitorCount();
    }
    next();
});

// Debug Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Static files for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const posRoutes = require('./routes/pos');

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pos', posRoutes);

// Serve Frontend Static Files (Production)
// Assuming dist is at ../client/dist relative to server.js
app.use(express.static(path.join(__dirname, '../client/dist')));

// SPA Fallback: matches any request not handled above
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Basic Route (Legacy - removed to avoid conflict with SPA)
// app.get('/', ...);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

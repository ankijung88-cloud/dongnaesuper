const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'supersecretkey'; // Should be in .env

const { products } = require('../data/mockDb');

// GET all products
router.get('/', (req, res) => {
    let requestUser = null;

    // Check for token manually for optional auth
    const token = req.header('x-auth-token');
    if (token) {
        try {
            requestUser = jwt.verify(token, SECRET_KEY);
        } catch (e) {
            // Invalid token, treat as guest
        }
    }

    // Role-based filtering
    let productList = products;
    if (requestUser && requestUser.role === 'owner') {
        productList = products.filter(p => p.ownerId === requestUser.id);
    }
    // Admins and Guests (Customers) see ALL products

    // Filter for Time Deals if query param exists ?type=timedeal
    if (req.query.type === 'timedeal') {
        productList = productList.filter(p => p.isTimeDeal);
    }

    res.json(productList);
});

// POST new product (with image)
router.post('/', auth, upload.single('image'), (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image required' });
        }

        const newProduct = {
            id: products.length + 1,
            ownerId: req.user.id, // Assign to logged-in owner
            name,
            price: Number(price),
            stock: Number(stock),
            image: `/uploads/${file.filename}`,
            category: '기타', // Default category if not provided
            subCategory: '기타'
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE product
router.delete('/:id', auth, (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ msg: 'Product not found' });

    const product = products[index];

    // Check ownership (Admin can delete anything, Owner only theirs)
    if (req.user.role !== 'admin' && product.ownerId !== req.user.id) {
        return res.status(403).json({ msg: 'Access denied: Not your product' });
    }

    products.splice(index, 1);
    res.json({ msg: 'Product deleted' });
});

module.exports = router;

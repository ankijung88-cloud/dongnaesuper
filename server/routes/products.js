const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const auth = require('../middleware/auth'); // Optional: Add auth middleware to protected routes later

// Mock Data for "Time Deal"
// isTimeDeal: true/false, discountPrice: number (saving calculation)
let products = [
    { id: 1, name: 'Fresh Apples (Bag)', price: 5000, discountPrice: 3000, stock: 5, isTimeDeal: true, image: '/uploads/apple.jpg', category: 'fresh' },
    { id: 2, name: 'Instant Noodle (Pack)', price: 4000, discountPrice: null, stock: 20, isTimeDeal: false, image: '/uploads/noodle.jpg', category: 'processed' }
];

// GET all products (Public)
router.get('/', (req, res) => {
    // Filter for Time Deals if query param exists ?type=timedeal
    if (req.query.type === 'timedeal') {
        const timeDeals = products.filter(p => p.isTimeDeal);
        return res.json(timeDeals);
    }
    res.json(products);
});

// POST new product (with image)
router.post('/', upload.single('image'), (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'Image required' });
        }

        const newProduct = {
            id: products.length + 1,
            name,
            price: Number(price),
            stock: Number(stock),
            image: `/uploads/${file.filename}`
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

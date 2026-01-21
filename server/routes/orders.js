const express = require('express');
const router = express.Router();

let orders = [];

// POST Create Order
router.post('/', (req, res) => {
    try {
        const { cartItems, total, userInfo, substitutionPreference } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // substitutionPreference: 'CALL', 'REFUND', 'REPLACE'
        const validPreferences = ['CALL', 'REFUND', 'REPLACE'];
        const subPref = validPreferences.includes(substitutionPreference) ? substitutionPreference : 'CALL';

        const newOrder = {
            id: Date.now(),
            items: cartItems,
            total: Number(total),
            userInfo: userInfo || { name: 'Guest' },
            substitutionPreference: subPref, // Key Feature: POS-less strategy
            status: 'RECEIVED', // RECEIVED, PREPARING, DELIVERING, COMPLETED
            createdAt: new Date()
        };

        orders.unshift(newOrder); // Add to top
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET My Orders (Needs Auth usually, mock for now)
router.get('/', (req, res) => {
    res.json(orders);
});

module.exports = router;

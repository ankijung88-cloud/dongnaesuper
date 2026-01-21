const express = require('express');
const router = express.Router();

const { orders } = require('../data/mockDb');

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

// GET Store Stats (Sales Logic)
router.get('/store-stats', (req, res) => {
    try {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfToday.getDate() - 1);

        // Filter for Yesterday (00:00 - 24:00)
        const yesterdayOrders = orders.filter(o => {
            const d = new Date(o.createdAt);
            return d >= startOfYesterday && d < startOfToday;
        });

        // Filter for Today (00:00 - Now)
        const todayOrders = orders.filter(o => {
            const d = new Date(o.createdAt);
            return d >= startOfToday;
        });

        const yesterdaySales = yesterdayOrders.reduce((acc, o) => acc + o.total, 0);
        const todaySales = todayOrders.reduce((acc, o) => acc + o.total, 0);
        const settlementAmount = Math.floor(yesterdaySales * 0.95); // 5% fee

        // Simple mock settlement status logic
        // If yesterday had sales, we assume it's 'Completed' (simulated)
        // In real app, this would check a 'settlements' table
        const settlementStatus = yesterdaySales > 0 ? '정산완료' : '미완료';

        res.json({
            yesterdaySales,
            settlementAmount,
            settlementStatus,
            todaySales
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch store stats' });
    }
});

module.exports = router;

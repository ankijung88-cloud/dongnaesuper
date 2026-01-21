const express = require('express');
const router = express.Router();

// Mock Data
const users = [
    { id: 1, name: 'Hong Gil Dong', email: 'hong@test.com', role: 'user', joinDate: '2023-01-01' },
    { id: 2, name: 'Kim Chul Soo', email: 'kim@test.com', role: 'owner', joinDate: '2023-01-15' },
    { id: 3, name: 'Lee Young Hee', email: 'lee@test.com', role: 'user', joinDate: '2023-02-20' }
];

// GET /api/admin/stats
router.get('/stats', (req, res) => {
    // In a real app, calculate from DB
    // Here we mock stats
    const stats = {
        totalUsers: users.length,
        totalSales: 1500000, // Mock sales amount
        activeOrders: 5,
        dailyVisitors: 120
    };
    res.json(stats);
});

// GET /api/admin/users
router.get('/users', (req, res) => {
    res.json(users);
});

module.exports = router;

const express = require('express');
const router = express.Router();

const { users, orders } = require('../data/mockDb');

// GET /api/admin/stats
router.get('/stats', (req, res) => {
    // Calculate stats dynamically
    const totalUsers = users.length;
    const activeOrders = orders.filter(o => o.status !== 'COMPLETED').length;
    const dailyVisitors = 120;

    // Mock Sales by Region/Store
    const salesByRegion = [
        { region: '서울', store: '역삼점', settlementStatus: true, yesterdaySales: 1350000, settlementAmount: 1282500, todaySales: 170000 },
        { region: '서울', store: '강남점', settlementStatus: true, yesterdaySales: 2100000, settlementAmount: 1995000, todaySales: 200000 },
        { region: '경기', store: '분당점', settlementStatus: false, yesterdaySales: 900000, settlementAmount: 855000, todaySales: 80000 },
        { region: '경기', store: '일산점', settlementStatus: true, yesterdaySales: 720000, settlementAmount: 684000, todaySales: 30000 },
        { region: '인천', store: '부평점', settlementStatus: false, yesterdaySales: 580000, settlementAmount: 551000, todaySales: 40000 },
        { region: '부산', store: '서면점', settlementStatus: true, yesterdaySales: 1050000, settlementAmount: 997500, todaySales: 50000 },
    ];

    // Calculate Total Commission (5% of Yesterday's Total Sales) as requested
    const totalYesterdaySales = salesByRegion.reduce((acc, curr) => acc + curr.yesterdaySales, 0);
    const totalSales = Math.floor(totalYesterdaySales * 0.05);

    const stats = {
        totalUsers,
        totalSales, // Now 5% of Yesterday's Sales
        activeOrders,
        dailyVisitors,
        salesByRegion
    };
    res.json(stats);
});

// GET /api/admin/users
router.get('/users', (req, res) => {
    // Return all users except passwords if you want to be safe, but for Admin Dashboard strictness isn't critical yet
    const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        joinDate: u.joinDate
    }));
    res.json(safeUsers);
});

module.exports = router;

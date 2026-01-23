const express = require('express');
const router = express.Router();

const { users, orders, getVisitorCount, save } = require('../data/mockDb');

// GET /api/admin/stats
router.get('/stats', (req, res) => {
    const totalUsers = users.length;
    const activeOrders = orders.filter(o => o.status !== 'COMPLETED').length;

    // Get Real Visitor Count
    const dailyVisitors = getVisitorCount();

    // Calculate Global Sales Logic (Reused from orders.js logic approx)
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const yesterdayOrders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= startOfYesterday && d < startOfToday;
    });
    const todayOrders = orders.filter(o => {
        const d = new Date(o.createdAt);
        return d >= startOfToday;
    });

    const globalYesterdaySales = yesterdayOrders.reduce((acc, o) => acc + o.total, 0);
    const globalTodaySales = todayOrders.reduce((acc, o) => acc + o.total, 0);

    // Dynamic Sales by Store (Owners)
    const owners = users.filter(u => u.role === 'owner');

    // Distribute sales? For this MVP, we assign all sales to the first owner found, or 'Store Owner'
    // To be cleaner, if there are multiple owners, we just show 0 for the others to reflect "Real" data (that they have 0 sales).
    const salesByRegion = owners.map(u => {
        // Simple logic: If user is the main seed owner, give them the stats. widthout storeId, we can't really split.
        const isMainOwner = u.email === 'owner@test.com';
        const ySales = isMainOwner ? globalYesterdaySales : 0;
        const tSales = isMainOwner ? globalTodaySales : 0;

        return {
            id: u.id, // Needed for delete
            region: '서울', // Mock region
            store: u.name, // Real Store Name
            settlementStatus: ySales > 0,
            yesterdaySales: ySales,
            settlementAmount: Math.floor(ySales * 0.95),
            todaySales: tSales
        };
    });

    const totalSales = Math.floor(globalYesterdaySales * 0.05);

    res.json({
        totalUsers,
        totalSales,
        activeOrders,
        dailyVisitors,
        salesByRegion
    });
});

// GET /api/admin/users
router.get('/users', (req, res) => {
    const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        joinDate: u.joinDate
    }));
    res.json(safeUsers);
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        save();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;

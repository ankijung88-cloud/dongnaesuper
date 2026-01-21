const express = require('express');
const router = express.Router();
const { posInventory } = require('../data/posDb');
const { products } = require('../data/mockDb');

// GET /api/pos/status
router.get('/status', (req, res) => {
    res.json({ status: 'connected', device: 'POS-Terminal-01' });
});

// POST /api/pos/sync
// "점주가 상품을 따로 등록할 필요 없이, POS에 찍힌 상품이 그대로 앱에 노출"
router.post('/sync', (req, res) => {
    let newItemsCount = 0;

    posInventory.forEach(posItem => {
        // Check if barcode already exists in online store
        const existing = products.find(p => p.barcode === posItem.barcode);

        if (existing) {
            // Sync Stock & Price (POS is Master)
            existing.stock = posItem.stock;
            existing.price = posItem.price;
        } else {
            // Auto-Register new item
            products.push({
                id: Date.now() + Math.random(),
                name: posItem.name,
                price: posItem.price,
                stock: posItem.stock,
                image: posItem.image || 'https://via.placeholder.com/150',
                isTimeDeal: false, // Default
                barcode: posItem.barcode,
                source: 'POS' // Marker
            });
            newItemsCount++;
        }
    });

    res.json({
        msg: 'POS Sync Complete',
        syncedDetails: {
            totalPosItems: posInventory.length,
            newlyRegistered: newItemsCount
        }
    });
});

// POST /api/pos/sale (Simulate offline sale)
router.post('/sale', (req, res) => {
    const { barcode, qty } = req.body;

    // 1. Update POS DB
    const posItem = posInventory.find(i => i.barcode === barcode);
    if (!posItem) return res.status(404).json({ msg: 'Item not found in POS' });

    posItem.stock -= qty;

    // 2. Real-time Sync to Online Store
    const onlineItem = products.find(p => p.barcode === barcode);
    if (onlineItem) {
        onlineItem.stock = posItem.stock; // Sync!
    }

    res.json({ msg: 'Sale Processed', remainingStock: posItem.stock });
});

// POST /api/pos/scan (Simulate scanning an item at POS)
router.post('/scan', (req, res) => {
    const { barcode } = req.body;

    const posItem = posInventory.find(i => i.barcode === barcode);
    if (!posItem) return res.status(404).json({ msg: 'POS DB에 없는 상품입니다.' });

    // Check if it exists in Online Store
    let onlineItem = products.find(p => p.barcode === barcode);
    let action = '';

    if (onlineItem) {
        // Already exists -> Just sync stock/price (and maybe decrement stock if it's a sale scan, but here we just simulate "Recognition")
        // Let's assume this "Scan" action is specifically "Register/Check"
        onlineItem.stock = posItem.stock;
        onlineItem.price = posItem.price;
        action = 'UPDATED';
    } else {
        // Not exists -> Auto Register
        products.push({
            id: Date.now() + Math.random(),
            name: posItem.name,
            price: posItem.price,
            stock: posItem.stock,
            image: posItem.image || 'https://via.placeholder.com/150',
            isTimeDeal: false,
            barcode: posItem.barcode,
            source: 'POS'
        });
        action = 'REGISTERED';
    }

    res.json({ msg: 'Scan Successful', action, item: posItem });
});

module.exports = router;

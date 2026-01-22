const fs = require('fs');
const path = require('path');
const DATA_FILE = path.join(__dirname, 'database.json');

// Default Data
let users = [
    { id: 1, name: 'Normal User', email: 'user@test.com', password: '123', role: 'user', joinDate: '2024-01-01' },
    { id: 2, name: 'Store Owner', email: 'owner@test.com', password: '123', role: 'owner', joinDate: '2024-01-02' },
    { id: 3, name: 'Super Admin', email: 'admin@test.com', password: '123', role: 'admin', joinDate: '2024-01-03' }
];

const seedProducts = require('./seedData');
let products = [...seedProducts];
let orders = [];

// Load data if exists
try {
    if (fs.existsSync(DATA_FILE)) {
        const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
        const data = JSON.parse(rawData);
        if (data.users) users = data.users;
        if (data.products) products = data.products;
        if (data.orders) orders = data.orders;
        console.log('📦 Database loaded from file');
    }
} catch (err) {
    console.error('Failed to load database file:', err);
}

// Save function
const save = () => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify({ users, products, orders }, null, 2));
        console.log('💾 Database saved');
    } catch (err) {
        console.error('Failed to save database:', err);
    }
};

module.exports = { users, products, orders, save };

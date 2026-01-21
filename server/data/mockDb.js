const users = [
    { id: 1, name: 'Normal User', email: 'user@test.com', password: '123', role: 'user', joinDate: '2024-01-01' },
    { id: 2, name: 'Store Owner', email: 'owner@test.com', password: '123', role: 'owner', joinDate: '2024-01-02' },
    { id: 3, name: 'Super Admin', email: 'admin@test.com', password: '123', role: 'admin', joinDate: '2024-01-03' }
];

const seedProducts = require('./seedData');

const products = [...seedProducts];

const orders = [];

module.exports = { users, products, orders };

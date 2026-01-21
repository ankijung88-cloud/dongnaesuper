const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock User Database
// Default accounts for testing
let users = [
    { id: 1, name: 'Normal User', email: 'user@test.com', password: '123', role: 'user' },
    { id: 2, name: 'Store Owner', email: 'owner@test.com', password: '123', role: 'owner' },
    { id: 3, name: 'Super Admin', email: 'admin@test.com', password: '123', role: 'admin' }
];

const SECRET_KEY = 'supersecretkey'; // Same as middleware/auth.js

// POST /api/auth/register
router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;

    // Simple validation
    if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check existing user
    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // In real app, hash this!
        role // 'user', 'owner', 'admin'
    };

    users.push(newUser);

    // Create token
    const token = jwt.sign({ id: newUser.id, role: newUser.role, name: newUser.name }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        token,
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check user
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create token
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
});

// GET /api/auth/user (Load User)
router.get('/user', (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
});

module.exports = router;

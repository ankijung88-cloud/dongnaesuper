const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { users, save } = require('../data/mockDb');

const SECRET_KEY = 'supersecretkey'; // Same as middleware/auth.js
const auth = require('../middleware/auth');

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
        role, // 'user', 'owner', 'admin'
        joinDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    save();

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

// GET /api/auth/users (Admin Only)
router.get('/users', auth, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    // Return users without passwords
    const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        joinDate: u.joinDate
    }));
    res.json(safeUsers);
});

// POST /api/auth/create-owner (Admin Only)
router.post('/create-owner', auth, (req, res) => {
    // Check if admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied: Admins only' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
        role: 'owner',
        joinDate: new Date().toISOString().split('T')[0]
    };

    users.push(newUser);
    save(); // Added save() here to persist created owners

    res.json({
        msg: 'Store Owner created successfully',
        owner: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
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

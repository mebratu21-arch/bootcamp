const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername, addUser, updateUser } = require('../models/user');
const { revokeToken } = require('../utils/revocation');

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validation Exercises
        if (!username || username.length < 3) {
            return res.status(400).json({ message: 'Username too short' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Password too short' });
        }

        if (findUserByUsername(username)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = { 
            username, 
            password: hashedPassword, 
            email: email || '', 
            isConfirmed: false,
            confirmationToken: jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
        };
        
        addUser(newUser);

        console.log(`[JWT-2 MOCK EMAIL] Link: http://localhost:5001/api/auth/confirm/${newUser.confirmationToken}`);

        res.status(201).json({ message: 'Registered. Please confirm email.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Confirm Email
router.get('/confirm/:token', (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        updateUser(decoded.username, { isConfirmed: true, confirmationToken: null });
        res.send('Email confirmed for jwt-2!');
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = findUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isConfirmed) {
            return res.status(401).json({ message: 'Please confirm email' });
        }

        const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/api/auth/refresh', maxAge: 7 * 24 * 60 * 60 * 1000 });

        res.json({ message: 'Logged in', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Refresh Route
router.post('/refresh', (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({ username: decoded.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid refresh token' });
    }
});

// Logout Route
router.post('/logout', (req, res) => {
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
    if (token) revokeToken(token);
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out' });
});

module.exports = router;

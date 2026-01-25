const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername, addUser, updateUser } = require('../models/user');
const { validateRegistration } = require('../middleware/validation');
const { isTokenRevoked, revokeToken } = require('../utils/revocation');

const router = express.Router();

// Register Route
router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        if (findUserByUsername(username)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = { 
            username, 
            password: hashedPassword,
            email: req.body.email || '',
            bio: '',
            isConfirmed: false,
            confirmationToken: jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' })
        };
        addUser(newUser);

        // Mock Email
        console.log(`[MOCK EMAIL] To: ${newUser.email} | Link: http://localhost:5000/api/auth/confirm/${newUser.confirmationToken}`);

        res.status(201).json({ message: 'User registered. Please check email to confirm.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Confirm Email Route
router.get('/confirm/:token', (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
        const user = findUserByUsername(decoded.username);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        updateUser(decoded.username, { isConfirmed: true, confirmationToken: null });
        
        res.send('Email confirmed! You can now login.');
    } catch (error) {
        res.status(400).send('Invalid or expired confirmation link');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isConfirmed) {
            return res.status(401).json({ message: 'Please confirm your email before logging in' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate Access Token (short-lived)
        const accessToken = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        // Generate Refresh Token (long-lived)
        const refreshToken = jwt.sign(
            { username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        // Set Access Token in Cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 mins
        });

        // Set Refresh Token in Cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/api/auth/refresh', // Only sent to refresh route
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.json({ message: 'Logged in successfully', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Refresh Token Route
router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token' });
    }

    // Revocation Check for Refresh Token
    if (isTokenRevoked(refreshToken)) {
        return res.status(401).json({ message: 'Refresh token has been revoked, please login again' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        const newAccessToken = jwt.sign(
            { username: decoded.username },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        });

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ message: 'Session expired, please login again' });
    }
});



// Logout Route
router.post('/logout', (req, res) => {
    const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies.refreshToken;

    if (accessToken) revokeToken(accessToken);
    if (refreshToken) revokeToken(refreshToken);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out successfully. Tokens invalidated.' });
});

module.exports = router;

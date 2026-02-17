const express = require('express');
const { updateUser, findUserByUsername } = require('../models/user');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    const user = findUserByUsername(req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...safeUser } = user;
    res.json(safeUser);
});

router.put('/profile', verifyToken, (req, res) => {
    const { email, bio } = req.body;
    const updated = updateUser(req.user.username, { email, bio });
    const { password, ...safeUser } = updated;
    res.json({ message: 'Profile updated', user: safeUser });
});

module.exports = router;

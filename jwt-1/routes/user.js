const express = require('express');
const { updateUser, findUserByUsername } = require('../models/user');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Get Profile
router.get('/profile', verifyToken, (req, res) => {
    const user = findUserByUsername(req.user.username);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

// Update Profile
router.put('/profile', verifyToken, (req, res) => {
    const { email, bio } = req.body;
    
    const updatedUser = updateUser(req.user.username, { email, bio });
    
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    const { password, ...userWithoutPassword } = updatedUser;
    res.json({ message: 'Profile updated', user: userWithoutPassword });
});

module.exports = router;

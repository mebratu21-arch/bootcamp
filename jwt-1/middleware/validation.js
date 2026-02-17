const validateRegistration = (req, res, next) => {
    const { username, password, email } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (email && !email.includes('@')) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    next();
};

module.exports = { validateRegistration };

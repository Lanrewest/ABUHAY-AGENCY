const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.register = async(req, res) => {
    const { name, email, password, role, phone } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User exists' });
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        user = await User.create({ name, email, password: hash, role, phone });

        // Create an email verification token (simple implementation)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        // Email verification stub: log link to console
        const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email/${token}`;
        console.log(`Verify email for ${email}: ${verifyUrl}`);
        res.status(201).json({ message: 'User created. Please check your email for verification link.', verifyToken: token });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token });
    } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.verifyEmail = async(req, res) => {
    const token = req.params.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ message: 'Invalid token' });
        user.isVerified = true;
        await user.save();
        res.json({ message: 'Email verified' });
    } catch (err) { res.status(400).json({ message: 'Token invalid or expired' }); }
};
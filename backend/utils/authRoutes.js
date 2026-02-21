const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async(req, res) => {
    const { name, email, password, phone, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role
        });

        if (user) {
            // Send Welcome Email
            const message = `
        <h1>Welcome to ABUHAY Agency!</h1>
        <p>Hi ${user.name},</p>
        <p>Thank you for registering with us. We are excited to help you find your dream property.</p>
        <p>Best regards,<br>The ABUHAY Team</p>
      `;

            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Welcome to ABUHAY Agency',
                    html: message,
                });
            } catch (emailError) {
                console.error("Welcome email failed:", emailError);
                // Continue even if email fails
            }

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Forgot Password
// @route   POST /api/auth/forgotpassword
// @access  Public
router.post('/forgotpassword', async(req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate Reset Token (Simple random string for demo, ideally hashed)
        const resetToken = crypto.randomBytes(20).toString('hex');

        // In a real app, save this token to the user model with an expiration
        // user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        // user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        // await user.save();

        const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;

        const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            html: message,
        });

        res.status(200).json({ message: 'Email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Email could not be sent' });
    }
});

module.exports = router;
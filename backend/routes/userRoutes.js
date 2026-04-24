const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

// --- PASSWORD RESET LOGIC ---

// @route POST /api/user/forgot-password or /api/users/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with that email.' });
        }
        
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPExpires = Date.now() + 1000 * 60 * 10; // 10 mins
        user.resetPasswordOTPVerified = false;
        await user.save();

        console.log(`Password reset OTP for ${email}: ${otp}`);

        const html = `<p>Your OTP for password reset is: <b>${otp}</b></p><p>Valid for 10 minutes.</p>`;
        await sendEmail(user.email, 'Your OTP for Password Reset', html);
        
        res.json({ message: 'OTP sent to your email.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || 'Server error.' });
    }
});

// @route POST /api/user/verify-otp
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.resetPasswordOTP) {
            return res.status(400).json({ message: 'Invalid request.' });
        }
        if (user.resetPasswordOTP !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
        if (user.resetPasswordOTPExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP expired.' });
        }

        user.resetPasswordOTPVerified = true;
        await user.save();
        res.json({ message: 'OTP verified successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// @route POST /api/user/reset-password
router.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.resetPasswordOTPVerified) {
            return res.status(400).json({ message: 'OTP not verified or invalid request.' });
        }

        // Update password (Model handles hashing usually)
        user.password = password;
        user.resetPasswordOTP = undefined;
        user.resetPasswordOTPExpires = undefined;
        user.resetPasswordOTPVerified = false;
        await user.save();

        res.json({ message: 'Password has been reset successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// --- AUTH LOGIC ---

// @route POST /api/user/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body || {};
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '30d' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route POST /api/user/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '30d' }, (err, token) => {
            if (err) throw err;
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route GET /api/user/profile
router.get('/profile', protect, async (req, res) => {
    // req.user middleware se aa raha hai
    res.json({ user: req.user });
});

module.exports = router;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, 'please fill a valid email address']
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },
        
        role:{
            type: String,
            enum: ['customer', 'admin'],
            default: 'customer'
        },

        // For password reset via OTP
        resetPasswordOTP: String,
        resetPasswordOTPExpires: Date,
        resetPasswordOTPVerified: { type: Boolean, default: false },
    }, 
    { timestamps: true }
);

// 🔒 Password Hash Middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔐 Match User entered password to Hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);


const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware')

const router = express.Router();

//@route POST /api/user/register
//@decs Register a new user
//@access Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body || {};
    try{
        //Registration Logic
       let user = await User.findOne({ email });
       if(user){
        return res.status(400).json({ message: 'User already exists' });
       }
       user = new User({ name, email, password });
       await user.save();

       //Create JWT Token
       const payload = { user: { id: user._id, role: user.role }};

       jwt.sign( payload, process.env.JWT_KEY, { expiresIn : '30d' }, (err, token) => {
        if(err) throw err;

        //send the user and token in response
       res.status(201).json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user,email,
                role: user.role,
            },token,
       });
    });

    }catch(err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});



//@route POST /api/user/login
//@desc Authentucate user 
//access Public
router.post('/login', async ( req, res ) => {
    const {email, password} = req.body;

    try{
        //Find user by email
        let user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'invaild Credentials' });
        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({ message: 'invaild Credentials' });

        //Create JWT Token
       const payload = { user: { id: user._id, role: user.role }};

       jwt.sign( payload, process.env.JWT_KEY, { expiresIn : '30d' }, (err, token) => {
        if(err) throw err;

        //send the user and token in response
       res.json({ 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },token,
       });
    });
        
    } catch(err) {
        console.log(err);
        res.status(500).send('server Error');
    }
})



// @route GET /api/user/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private

router.get ('/profile', protect, async (req, res ) => {
     res.json({ user: req.user });
})



module.exports = router;





const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users');
const session = require('express-session')


router.use(express.urlencoded({ extended: true }));
router.use(session({
    secret: 'thisIsJustDumb',
    saveUninitialized: false,
    resave: false   //this is like signing the cookie
}))

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password.trim(), 12);

        const user = new User({
            name,
            password: hashedPassword,
            email
        });

        await user.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findAndValidate(name, password);
        if (!user) {
            res.send("sorry");
        }
        else {
            req.session.UID = user.id;
            console.log(req.session)
            res.send(req.session);
        }

    }
    catch (err) {
        console.log(err.message)
    }
})



module.exports = router;

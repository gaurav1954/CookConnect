const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users');
const cors=require('cors')

router.use(express.json());
router.use(session({
    secret: 'thisIsJustDumb',
    saveUninitialized: false,
    resave: false   // this is like signing the cookie
}));
router.use(cors())
router.use(passport.initialize());
router.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom middleware to handle login authentication
const loginMiddleware = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials', error: info.message });
        }

        // Manually log in the user
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            next(); // Proceed to the next middleware (login route)
        });
    })(req, res, next);//the authenticate function will return a middleware which will be immediately invoked with the following (req,res,next)
};
const isLoggedIn=(req,res,next)=>{
    if(req.isAuthenticated())
    next();
    else 
    res.status(500).json({message:"you need to login first"})
}``
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;
        const user = new User({
            username,
            email
        });
        const newUser = await User.register(user, password);
        console.log(newUser)
        res.status(201).json({ message: 'Signup successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});

router.post('/login', loginMiddleware, (req, res) => {
    res.status(200).json({ message: 'Login successful' });
});
router.get('/recepies',isLoggedIn,(req,res)=>{
    res.send(req.user);
})
module.exports = router;

const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const MongoStore = require('connect-mongo');
const morgan = require('morgan')

const User = require('../models/users');
const Recipe = require('../models/recipe');

// Import route files
const authRoutes = require('./authRoutes');
const recipeRoutes = require('./recipeRoutes');

// Middleware
router.use(express.json());
router.use(session({
    secret: 'this is the secret key',
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.URI,
        collectionName: process.env.SessionStore
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(morgan('dev'))

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use route files
router.use('/auth', authRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;

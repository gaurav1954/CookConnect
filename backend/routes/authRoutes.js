const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const { storage } = require('../cloudinary');
const {
    checkAuth, signup, failLogin, login, logout, updateInfo, userInfo, registeredData
} = require('../controllers/userController');

const parser = multer({ storage });

// Authentication routes
router.get('/check-auth', checkAuth);
router.post('/signup', signup);
router.get('/fail', failLogin);
router.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), login);
router.post('/logout', logout);
router.post('/update-info', parser.single('profileImage'), updateInfo);
router.get('/user-info', userInfo);
router.get('/registeredData', registeredData);

module.exports = router;

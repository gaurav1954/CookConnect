const User = require('../models/users');
const Recipe = require('../models/recipe');
const Review = require('../models/review');

exports.checkAuth = (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
};

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, firstTime: true });
        const newUser = await User.register(user, password);
        res.status(200).json({ message: 'Signup successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
};

exports.failLogin = (req, res) => {
    res.json("login failed");
};

exports.login = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user.firstTime) {
        await user.save();
        res.status(201).json({ message: "Login sucess" });
    } else {
        res.status(200).json({ message: "Login sucess" });
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    });
};

exports.updateInfo = async (req, res) => {
    const userId = req.user._id;
    const { name, age, location, bio, favoriteCuisine, cookingExperience, allergies, instagram } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name;
        user.age = age;
        user.location = location;
        user.bio = bio;
        user.favoriteCuisine = favoriteCuisine;
        user.cookingExperience = cookingExperience;
        user.allergies = allergies;
        user.instagram = instagram;

        // Only update profile image if a new one was uploaded
        if (req.file) {
          user.profileImage = req.file.path;
        }

        user.firstTime = false;
        await user.save();
        console.log(user);
        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while updating user information' });
    }
};

exports.userInfo = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('created');
    console.log(user);
    res.status(200).json(user);
};

exports.registeredData = async (req, res) => {
    try {
        const users = await User.find({}, 'username email');
        const usernames = users.map(user => user.username);
        const emails = users.map(user => user.email);
        res.status(200).json({ usernames, emails });
    } catch (error) {
        console.error('Error fetching registered data:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

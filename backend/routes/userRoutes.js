const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../models/users');
const multer = require('multer')
const Recipe = require('../models/recipe');
const Review = require('../models/review');
const { storage } = require('../cloudinary')
const MongoStore = require('connect-mongo');
const recipe = require('../models/recipe');

const parser = multer({ storage })
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

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Custom middleware to check if the user is authenticated
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: 'You need to login first' });
    }
};

// Check if user is authenticated
router.get('/check-auth', (req, res) => {
    res.json({ isAuthenticated: req.isAuthenticated() });
});

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, firstTime: true });
        const newUser = await User.register(user, password);
        res.status(200).json({ message: 'Signup successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: err.message });
    }
});
router.get('/fail', (req, res) => {
    res.json("login failed");
})
router.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }), async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId)
    if (user.firstTime) {
        await user.save();
        res.status(201).json(req.session);
    }
    else
        res.status(200).json(req.session);
});

// Logout route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        req.session.destroy((err) => { // Destroy session data
            if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.status(200).json({ message: 'Logout successful' });
        });
    });
});

router.post('/update-info', parser.single('profileImage'), async (req, res) => {
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
        user.profileImage = req.file.path;
        user.firstTime = false;
        await user.save();
        console.log(user);
        // Send success response
        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred while updating user information' });
    }
});

router.get('/user-info', async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('created');
    console.log(user);
    res.status(200).json(user);
});

router.get('/registeredData', async (req, res) => {
    try {
        const users = await User.find({}, 'username email');
        const usernames = users.map(user => user.username);
        const emails = users.map(user => user.email);
        res.status(200).json({ usernames, emails });
    } catch (error) {
        console.error('Error fetching registered data:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/recipes/:recipeId/like-status', async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    if (recipe.likes.includes(userId))
        res.json({ "liked": 1 });
    else
        res.json({ "liked": 0 });
});

router.get('/recipes/:recipeId/saved-status', async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId)
    if (user.saved.includes(recipeId))
        res.json({ "saved": 1 });
    else
        res.json({ "saved": 0 });

});

router.post('/recipes/:recipeId/review', async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const { data } = req.body; // Destructuring the body to get the data property
    const review = new Review({ author: userId, data }); // Passing author and data to the review instance
    const recipe = await Recipe.findById(recipeId);
    recipe.reviews.push(review.id);
    await review.save();
    await recipe.save();
    await recipe.populate('reviews')
    await review.populate('author');
    res.status(200).json({ message: "success" });

});

router.get('/recipes/saved', async (req, res) => {
    try {
        const userId = req.user._id;
        // Populate both 'saved' and 'author' fields
        const user = await User.findById(userId).populate({
            path: 'saved',
            populate: {
                path: 'author',
                model: 'User'
            }
        });
        let recipes = user.saved;
        recipes = recipes.map(recipe => ({
            ...recipe.toObject(),
            likes: recipe.likes.length // Replace likes array with its length
        }));
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/recipes/info/:recipeId", async (req, res) => {
    const { recipeId } = req.params;
    try {
        let recipe = await Recipe.findById(recipeId)
            .populate("author")
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                    model: 'User'
                }
            });

        // Replace likes array with its length
        recipe = {
            ...recipe.toObject(),
            likes: recipe.likes.length
        };
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/recipes/:page/:limit', async (req, res) => {
    const { page, limit } = req.params;
    const { cuisine } = req.query;
    let recipes;
    try {
        if (cuisine) {
            recipes = await Recipe.find({ cuisine: cuisine })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("author");
        }
        else {
            recipes = await Recipe.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("author");
        }


        recipes = recipes.map(recipe => ({
            ...recipe.toObject(),
            likes: recipe.likes.length // Replace likes array with its length
        }));
        res.status(200).json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/recipes/create', parser.single('image'), async (req, res) => {
    const { ingredients, ...newRecipeData } = req.body; // Destructure ingredients from req.body
    const newIngredients = ingredients.split(' ').map(ingredient => ingredient.trim()); // Split ingredients string into array

    newRecipeData.author = req.user._id;
    newRecipeData.ingredients = newIngredients; // Assign the array of ingredients to newRecipeData
    const user = await User.findById(req.user._id);
    const newRecipe = new Recipe(newRecipeData);
    newRecipe.image = req.file.path;
    await newRecipe.save();
    user.created.push(newRecipe);
    await user.save();
    res.status(200).json({ msg: "done" });
});

// Like a recipe
router.post('/recipes/like/:recipeId', isLoggedIn, async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Check if the user has already liked the recipe
        if (recipe.likes && recipe.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'Recipe already liked by this user' });
        }

        recipe.likes.push(req.user._id); // Add user ID to the likes array
        await recipe.save();

        res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }

});
// Unlike a recipe
router.post('/recipes/unlike/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Check if the user has liked the recipe
        const indexOfUser = recipe.likes.indexOf(userId);
        if (indexOfUser === -1) {
            return res.status(400).json({ message: 'Recipe not liked by this user' });
        }

        recipe.likes = recipe.likes.filter(id => id.toString() !== userId.toString());
        await recipe.save();

        res.status(200).json({ message: 'Recipe unliked successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/recipes/save/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const recipe = await Recipe.findById(recipeId);
        const user = await User.findById(userId)
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.savedBy += 1; // Update this line with your specific logic
        user.saved.push(recipeId);

        await user.save();
        await recipe.save();

        res.status(200).json({ message: 'Recipe shared successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Unshare a recipe
router.post('/recipes/unsave/:recipeId', async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const recipe = await Recipe.findById(recipeId);
        const user = await User.findById(userId)
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.savedBy -= 1; // Update this line with your specific logic
        user.saved = user.saved.filter(id => id.toString() !== recipeId.toString());
        await user.save();
        await recipe.save();

        res.status(200).json({ message: 'Recipe shared successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

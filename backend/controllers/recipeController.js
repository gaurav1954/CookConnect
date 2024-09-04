const Recipe = require('../models/recipe');
const User = require('../models/users');
const Review = require('../models/review');

exports.likeStatus = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    if (recipe.likes.includes(userId))
        res.json({ "liked": 1 });
    else
        res.json({ "liked": 0 });
};

exports.savedStatus = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    const user = await User.findById(userId);
    if (user.saved.includes(recipeId))
        res.json({ "saved": 1 });
    else
        res.json({ "saved": 0 });
};

exports.reviewRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    const { data } = req.body;
    const review = new Review({ author: userId, data });
    const recipe = await Recipe.findById(recipeId);
    recipe.reviews.push(review.id);
    await review.save();
    await recipe.save();
    await recipe.populate('reviews');
    await review.populate('author');
    res.status(200).json({ message: "success" });
};

exports.savedRecipes = async (req, res) => {
    try {
        const userId = req.user._id;
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
            likes: recipe.likes.length
        }));
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.recipeInfo = async (req, res) => {
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
        recipe = {
            ...recipe.toObject(),
            likes: recipe.likes.length
        };
        res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.listRecipes = async (req, res) => {
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
        } else {
            recipes = await Recipe.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("author");
        }
        recipes = recipes.map(recipe => ({
            ...recipe.toObject(),
            likes: recipe.likes.length
        }));
        res.status(200).json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createRecipe = async (req, res) => {
    const { ingredients, ...newRecipeData } = req.body;
    const newIngredients = ingredients.split(' ').map(ingredient => ingredient.trim());
    newRecipeData.author = req.user._id;
    newRecipeData.ingredients = newIngredients;
    const user = await User.findById(req.user._id);
    const newRecipe = new Recipe(newRecipeData);
    newRecipe.image = req.file.path;
    await newRecipe.save();
    user.created.push(newRecipe);
    await user.save();
    res.status(200).json({ msg: "done" });
};

exports.likeRecipe = async (req, res) => {
    const { recipeId } = req.params;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (recipe.likes && recipe.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'Recipe already liked by this user' });
        }
        recipe.likes.push(req.user._id);
        await recipe.save();
        res.status(200).json({ message: 'Recipe liked successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unlikeRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
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
};

exports.saveRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const recipe = await Recipe.findById(recipeId);
        const user = await User.findById(userId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.savedBy += 1;
        user.saved.push(recipeId);
        await user.save();
        await recipe.save();
        res.status(200).json({ message: 'Recipe shared successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unshareRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user._id;
    try {
        const recipe = await Recipe.findById(recipeId);
        const user = await User.findById(userId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        recipe.savedBy -= 1;
        user.saved = user.saved.filter(id => id.toString() !== recipeId.toString());
        await user.save();
        await recipe.save();
        res.status(200).json({ message: 'Recipe shared successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const {
    likeStatus, savedStatus, reviewRecipe, savedRecipes, recipeInfo, listRecipes, createRecipe, likeRecipe, unlikeRecipe, saveRecipe, unshareRecipe
} = require('../controllers/recipeController');

const parser = multer({ storage });

// Recipe routes
router.get('/:recipeId/like-status', likeStatus);
router.get('/:recipeId/saved-status', savedStatus);
router.post('/:recipeId/review', reviewRecipe);
router.get('/saved', savedRecipes);
router.get('/info/:recipeId', recipeInfo);
router.get('/:page/:limit', listRecipes);
router.post('/create', parser.single('image'), createRecipe);
router.post('/like/:recipeId', likeRecipe);
router.post('/unlike/:recipeId', unlikeRecipe);
router.post('/save/:recipeId', saveRecipe);
router.post('/unsave/:recipeId', unshareRecipe);

module.exports = router;

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        default: 'Unknown', // You can modify the default value based on your application's needs
    },
    description: {
        type: String,
    },
    steps: {
        type: [String]
    },
    ingredients: {
        type: [String], // Assuming an array of ingredient strings
    },
    instructions: {
        type: String,
    },
    cookingTime: {
        type: Number, // Assuming time is represented in minutes
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Moderate', 'Difficult'], // Assuming difficulty levels
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    likes: {
        type: Number
    }

});

module.exports = mongoose.model('Recipe', recipeSchema);

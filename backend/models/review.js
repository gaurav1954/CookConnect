// Import necessary modules
const mongoose = require('mongoose');
const Recipe = require('./recipe'); // Import the Recipe model

// Define the review schema
const reviewSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    data: String,
});

// Define pre-remove middleware on the review schema
reviewSchema.pre('remove', async function (next) {
    try {
        // Remove the review ID from the associated recipe's reviews array
        await Recipe.updateOne({ reviews: this._id }, { $pull: { reviews: this._id } });
        next();
    } catch (error) {
        next(error);
    }
});

// Create and export the Review model
module.exports = mongoose.model('Review', reviewSchema);

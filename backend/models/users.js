const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Passport will automatically add username, hash, salt, and some functions to this schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    created: {
        type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the recipe
        ref: 'Recipe',
        default: [],
    },
    saved: {
        type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the recipe
        ref: 'Recipe',
        default: [],
    },
    firstTime: {
        type: Boolean,
        default: true,
    },
    name: String,
    age: Number,
    location: String,
    bio: String,
    favoriteCuisine: String,
    cookingExperience: String,
    allergies: String,
    instagram: String,
    profileImage: String,

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

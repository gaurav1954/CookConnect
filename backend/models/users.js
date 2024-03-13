const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
//passort will automatically add username, hash, salt and some functions to this schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);  
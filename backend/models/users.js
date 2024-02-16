const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})
userSchema.statics.findAndValidate = async function (name, password) {
    const user = await this.findOne({ name });
    console.log(user)
    if (!user)
        return null
    const isValid = await bcrypt.compare(password.trim(), user.password)
    console.log(isValid)
    return isValid ? user : false;
}

module.exports = mongoose.model('User', userSchema);
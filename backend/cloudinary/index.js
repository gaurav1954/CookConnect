const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv')
dotenv.config();
cloudinary.config({
    cloud_name: process.env.NAME,
    api_key: process.env.KEY,
    api_secret: process.env.SECRET
})
const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'form',
    allowedFormats: ['jpg', 'jpeg', 'png']
});

module.exports = { storage };

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dzoozuhid',
    api_key: '842672256646733',
    api_secret: 'KbgUxdVUp6TtYdPgkyca1t1dwZM'
})
const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'form',
    allowedFormats: ['jpg', 'jpeg', 'png']
});

module.exports = { storage };

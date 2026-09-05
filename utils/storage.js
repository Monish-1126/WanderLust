const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "wanderlust",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
});

module.exports = storage;
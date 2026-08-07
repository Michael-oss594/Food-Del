const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'food-del',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
            {
                width: 500,
                height: 500,
                crop: 'fill',
                gravity: 'face',
                quality: 'auto:good',
                format: 'jpg'
            }
        ],
        public_id: (req, file) => {
            const userId = req.user?.id || 'anonymous';
            const timestamp = Date.now();
            return `profile_${userId}_${timestamp}`;
        }
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
 const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
 });
 const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.upload.destroy(publicId);
        return result;
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
 };
 const extractPublicId = (url) => {
    const matches = url.match(/\/v\d+\/(.+)\./);
    return matches ? matches[1] : null;
 };

 module.exports = {
    cloudinary,
    upload,
    deleteImage,
    extractPublicId,
 };
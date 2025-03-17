require('dotenv').config()


module.exports = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'Your DB_URL',
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    API_KEY:process.env.API_KEY  || "API",
    API_secret:process.env.API_secret,
    API_CLOUDINARY_key:process.env.API_CLOUDINARY_key,
    cloud_name:process.env.cloud_name,
    OPENAI_API_KEY:process.env.OPENAI_API_KEY

}
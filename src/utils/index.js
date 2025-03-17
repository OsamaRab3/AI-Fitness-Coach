

const cloudinary = require('cloudinary').v2;
const config = require('../config/index')
const path = require('path');

cloudinary.config({ 
    cloud_name: config.cloud_name, 
    api_key: config.API_CLOUDINARY_key, 
    api_secret: config.API_secret
});

const upload = async (imagePath) => {

    try {
        const res = await cloudinary.uploader.upload(path.join("exercise-images",imagePath));
        const url = cloudinary.url(res.public_id,{
            transformation:[
                {
                    quality:'auto',
                    fetch_format:'auto'
                },
                {
                    width:1200,
                    height:1200,
                    crop:'fill'
                }
            ]
        })

        return url;
    } catch (error) {
        console.error('Upload failed:', error);
    }
};


module.exports = upload;
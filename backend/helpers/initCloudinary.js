const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(400).json({ message: err });
      resolve(res.secure_url);
    });
  });
};

exports.deleteImageOnCloudinary = (cloudinary_id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(cloudinary_id, (err, res) => {
      if (err) return res.status(400).json({ message: err });
    });
  });
};

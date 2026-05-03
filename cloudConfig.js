if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
}

if (
  process.env.NODE_ENV === "production" &&
  !process.env.CLOUDINARY_URL &&
  !(process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET)
) {
  console.warn(
    "Cloudinary credentials are missing. Upload routes may fail until CLOUDINARY_URL or CLOUD_NAME/CLOUD_API_KEY/CLOUD_API_SECRET are configured."
  );
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

module.exports = {
    cloudinary,
    storage,
};

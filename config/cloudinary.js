const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dfd5qjcix",
  api_key: "677814352231521",
  api_secret: "f0U_8nbhg9B8UmoES8rShdYgej0",
  secure: true
});

module.exports = cloudinary;
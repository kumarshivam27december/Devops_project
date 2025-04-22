require("dotenv").config(); // Access env file

module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB connection string from .env
  secretOrKey: process.env.SECRET  // Secret key for JWT
};

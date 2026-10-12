const mongoose = require("mongoose");

const Connection = () => {
  mongoose
    .connect(process.env.DatabasesURL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = Connection;

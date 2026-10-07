// const express = require("express");
// const app = express();
// const dotenv = require("dotenv");
// const { MongoClient } = require("mongodb");
// const mongoose = require("mongoose");
// dotenv.config();
// const port = process.env.port || 3000;
// const client = new MongoClient(process.env.DatabasesURL);

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB '''' ");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }
// run().catch(console.error);

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   age: Number,
// });
// const user = mongoose.model("Users", userSchema);
// app.post("/api/v1/user/create", async (req, res) => {
//   const userReq = req.body;
//   const user = await user.create(userReq);

//   console.log("userReq:", userReq);
//   res.json({
//     message: "User created successfully",
//     user: userReq,
//   });
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
//////

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const port = process.env.port || 3000;

app.use(express.json());

mongoose
  .connect(process.env.DatabasesURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("Users", userSchema);
//create user
app.post("/api/v1/user/create", async (req, res) => {
  try {
    const userReq = req.body;

    const user = await User.create(userReq);

    console.log("userReq:", userReq);

    res.json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});
//  get all users
app.get("/api/v1/user/get", async (req, res) => {
  const users = await User.find();
  res.json({
    message: "Users retrieved successfully",
    data: users,
  });
});
//update user
app.put("/api/v1/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.age = req.body.age;
  await user.save();
  res.json({
    message: "User updated successfully",
    data: user,
  });
});

///delete user
app.delete("/api/v1/user/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted successfully",
    data: user,
  });
});
////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

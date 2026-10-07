const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();
const port = process.env.port || 3000;
const client = new MongoClient(process.env.DatabasesURL);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB '''' ");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
run().catch(console.error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

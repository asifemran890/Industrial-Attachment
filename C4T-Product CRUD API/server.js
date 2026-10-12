const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port || 3000;
const Connection = require("./config/Database.config");
app.use(express.json());
const productRoutes = require("./Routes/product.routes");


// Connect to MongoDB
Connection();

app.use("/api/v1/product", productRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

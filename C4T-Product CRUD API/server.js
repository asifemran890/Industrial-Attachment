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

const productSchema = new mongoose.Schema({
  product: String,
  price: Number,
  Description: String,
  Quantity: Number,
});

const Product = mongoose.model("product", productSchema);

// Create product
app.post("/api/v1/product/create", async (req, res) => {
  try {
    const newProductData = req.body;
    console.log(newProductData);

    const savedProduct = await Product.create(newProductData);

    console.log("Product:", savedProduct);
    res.json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});
//  get all products
app.get("/api/v1/product/getall", async (req, res) => {
  const products = await Product.find();
  res.json({
    message: "All products",
    products: products,
  });
});
// update product
app.put("/api/v1/product/update/:id", async (req, res) => {
  const productId = await Product.findById(req.params.id);

  productId.product = req.body.product;
  productId.price = req.body.price;
  productId.Description = req.body.Description;
  productId.Quantity = req.body.Quantity;
  await productId.save();

  res.json({
    message: "Product updated successfully",
    product: productId,
  });
});

// delete product
app.delete("/api/v1/product/delete/:id", async (req, res) => {
  const productId = await Product.findById(req.params.id);
  await productId.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

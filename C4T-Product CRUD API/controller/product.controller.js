const Product = require("../model/product.model");

const CreateProduct = async (req, res) => {
  const data = req.body;
  const product = await Product.create(data);
  console.log("Product Data Created", data);

  res.json({
    message: "Create Product Successfully",
    data: product,
  });
};

const GetAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json({
    message: "All products",
    products: products,
  });
};

const UpdateProduct = async (req, res) => {
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
};

const DeleteProduct = async (req, res) => {
  const productId = await Product.findById(req.params.id);
  await productId.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
};

module.exports = {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
};

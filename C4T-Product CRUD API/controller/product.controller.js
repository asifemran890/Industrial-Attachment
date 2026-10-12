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
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;

    const totalData = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalData / limit),
      totalData: totalData,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

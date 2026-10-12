const router = require("express").Router();
const {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
} = require("../controller/product.controller");

router.post("/CreateProduct", CreateProduct);
router.get("/GetAllProducts", GetAllProducts);
router.put("/UpdateProduct/:id", UpdateProduct);
router.delete("/DeleteProduct/:id", DeleteProduct);

module.exports = router;

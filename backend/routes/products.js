import express from "express";

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

//Route to create a new product
router.post("/add", createProduct);

//Route to get all product
router.get("/", getProducts);

//Route to update a product by id
router.put("/update/:id", updateProduct);

//Route to delete a product by id
router.delete("/delete/:id", deleteProduct);

export default router;
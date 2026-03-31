import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//get all products
router.get("/", getProducts);

//get product by id
router.get("/:id", getProductById);

//create product
router.post("/add", protect, isAdmin, createProduct);

//update product
router.put("/update/:id", protect, isAdmin, updateProduct);

//delete product
router.delete("/delete/:id", protect, isAdmin, deleteProduct);

export default router;
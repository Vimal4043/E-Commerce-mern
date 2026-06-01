import express from "express";

import { createProduct } from "../controllers/Product/create/CreateProduct.js";
import { getProducts } from "../controllers/Product/read/GetProducts.js";
import { getProductById } from "../controllers/Product/read/GetProductById.js";
import { updateProduct } from "../controllers/Product/update/UpdateProduct.js";
import { deleteProduct } from "../controllers/Product/delete/DeleteProduct.js";
import { getCategories } from "../controllers/Product/read/GetCategories.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

//get all products
router.get("/", getProducts);

//get all categories
router.get("/categories", getCategories);

//get product by id
router.get("/:id", getProductById);

//create product
router.post("/add", protect, isAdmin, createProduct);

//update product
router.put("/update/:id", protect, isAdmin, updateProduct);

//delete product
router.delete("/delete/:id", protect, isAdmin, deleteProduct);

export default router;
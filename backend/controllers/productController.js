import Product from "../models/Product.js";

// Create a new Product
export const createProduct = async (req, res) => {
  try {
    const { title, category, image } = req.body;
    const productExist = await Product.findOne({  
      title, category, image
    })

    if (productExist) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    const product = await Product.create(req.body);
    res.json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all Products
export const getProducts = async (req, res) => {
  try {
    const {search, category} = req.query;
    let filter = {};

    if(search){
      filter.title = {$regex: search, $options: 'i'}; //Case-insensitive
    }

    if(category){
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get a single Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update a Product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete a Product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error
    });
  }
};
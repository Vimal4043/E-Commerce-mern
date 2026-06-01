import Product from "../../../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { title, category, image } = req.body;
    const productExist = await Product.findOne({ title, category, image });

    if (productExist) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = await Product.create(req.body);
    res.json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

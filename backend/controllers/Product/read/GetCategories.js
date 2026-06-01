import Product from "../../../models/Product.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories.filter(cat => cat));
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

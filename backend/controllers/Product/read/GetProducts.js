import Product from "../../../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 24, 1);
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit + 1);

    const hasMore = products.length > limit;
    const paginatedProducts = hasMore ? products.slice(0, limit) : products;

    res.json({ products: paginatedProducts, hasMore });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

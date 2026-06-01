import Product from "../../../models/Product.js";

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

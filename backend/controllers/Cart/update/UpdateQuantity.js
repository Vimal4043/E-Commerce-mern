import Cart from "../../../models/Cart.js";
import Product from "../../../models/Product.js";

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const qty = Number(quantity);
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (qty > product.stock) {
      return res.status(400).json({ message: "Quantity exceeds available stock" });
    }

    item.quantity = qty;

    await cart.save();
    res.json({ message: "Item quantity updated", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

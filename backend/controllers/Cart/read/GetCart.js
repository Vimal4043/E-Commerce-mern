import Cart from "../../../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

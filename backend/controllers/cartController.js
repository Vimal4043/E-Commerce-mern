import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;   // from JWT (secure)
    const { productId } = req.body;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check stock
    if (product.stock < 1) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Remove item from cart
export const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;   // from JWT (secure)
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();
    res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update item quantity in cart
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;   // from JWT (secure)
    const { productId, quantity } = req.body;

    // Quantity validation
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

    // Check product stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (qty > product.stock) {
      return res.status(400).json({
        message: "Quantity exceeds available stock"
      });
    }

    item.quantity = qty;

    await cart.save();
    res.json({
      message: "Item quantity updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get cart by user ID
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;   // from JWT (secure)

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: []
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
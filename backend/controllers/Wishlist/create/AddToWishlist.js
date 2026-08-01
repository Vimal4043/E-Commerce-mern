import Wishlist from "../../../models/Wishlist.js";
import Product from "../../../models/Product.js";

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            wishlist = new Wishlist({ userId, items: [{ productId }] });
        } else {
            const exists = wishlist.items.find(
                (i) => i.productId.toString() === productId
            );
            if (exists) {
                return res.status(400).json({ message: "Item already in wishlist" });
            }
            wishlist.items.push({ productId });
        }

        await wishlist.save();
        res.json({ message: "Item added to wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
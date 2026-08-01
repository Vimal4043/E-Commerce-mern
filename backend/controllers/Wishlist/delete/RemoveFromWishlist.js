import Wishlist from "../../../models/Wishlist.js";

export const removeFromWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.items = wishlist.items.filter(
            (i) => i.productId.toString() !== productId
        );

        await wishlist.save();
        res.json({ message: "Item removed from wishlist", wishlist });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
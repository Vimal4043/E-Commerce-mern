import Wishlist from "../../../models/Wishlist.js";

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        let wishlist = await Wishlist.findOne({ userId }).populate("items.productId");

        if (!wishlist) {
            wishlist = await Wishlist.create({ userId, items: [] });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
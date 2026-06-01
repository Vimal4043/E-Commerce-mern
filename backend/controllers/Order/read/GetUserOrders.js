import Order from "../../../models/Order.js";

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 }).populate('items.productId', 'title price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

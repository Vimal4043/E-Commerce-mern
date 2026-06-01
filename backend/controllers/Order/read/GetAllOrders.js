import Order from "../../../models/Order.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email')
            .populate('items.productId', 'title price image');

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

import Order from "../../../models/Order.js";

export const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.productId');
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

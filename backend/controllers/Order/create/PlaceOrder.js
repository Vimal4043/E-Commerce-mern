import Order from "../../../models/Order.js";
import Cart from "../../../models/Cart.js";
import Product from "../../../models/Product.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        for (const item of cart.items) {
            if (!item.productId) {
                return res.status(400).json({ message: "Cart has unavailable product(s)" });
            }

            if (item.productId.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${item.productId.name}` });
            }
        }

        const orderItems = cart.items.map(item => ({
            productId: item.productId?._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));

        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        for (let item of cart.items) {
            await Product.findByIdAndUpdate(
                {
                    _id: item.productId._id,
                    stock: { $gte: item.quantity }
                },
                { $inc: { stock: -item.quantity } }
            );
        }

        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD",
        });

        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({ message: "Order placed successfully", orderId: order._id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

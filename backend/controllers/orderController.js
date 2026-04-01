import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { address } = req.body;

        //Get Cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        // Validate cart + stock + product existence
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        for (const item of cart.items) {
            // product deleted
            if (!item.productId) {
                return res.status(400).json({
                    message: "Cart has unavailable product(s)"
                });
            }

            // insufficient stock
            if (item.productId.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${item.productId.name}`
                });
            }
        }

        //Prepare Order Items
        const orderItems = cart.items.map(item => ({
            productId: item.productId?._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));

        //Calculate Total Amount
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        //Deduct stock from Products
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(
                { 
                    _id: item.productId._id,
                    stock: { $gte: item.quantity }
                 },
                { $inc: { stock: -item.quantity } }
            );
        }

        //Create Order
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD",
        });

        //Clear Cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({ message: "Order placed successfully", orderId: order._id });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//Get User Orders
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 }).populate('items.productId', 'title price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//Get Order Details by orderId
export const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.productId');
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
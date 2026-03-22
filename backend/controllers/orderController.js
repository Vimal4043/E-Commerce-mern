import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        //Get Cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        //Prepare Order Items
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));

        //Calculate Total Amount
        const totalAmount = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

        //Deduct stock from Products
        for (let item of cart.items){
            await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity } });
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

//Get Orders for a User by userId
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).populate('items.productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

//Get All Orders (Admin)
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find().populate('items.productId').populate('userId', 'name email');
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// }

//Update Order Status (Admin)
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const { status } = req.body;

//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" });
//         }
//         order.status = status;
//         await order.save();
//         res.status(200).json({ message: "Order status updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
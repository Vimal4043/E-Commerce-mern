import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', orderRoutes);

app.get("/", (req, res)=>{
    res.send("API is running");
});

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
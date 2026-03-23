import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: [
            "electronics",
            "clothing",
            "footwear",
            "accessories",
            "home",
            "beauty",
            "books",
            "sports",
            "toys",
            "groceries"
        ]
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
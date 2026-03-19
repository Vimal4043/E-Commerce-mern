import mongoose from "mongoose";
import sampleListing from "./data.js";
import Product from "../models/product.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/ecom";

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Product.deleteMany({});
    await Product.insertMany(sampleListing);
    console.log("data was initialized");
};

initDB();
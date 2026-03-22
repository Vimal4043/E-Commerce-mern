import mongoose from "mongoose";
import sampleListing from "./data.js";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL;

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
    // await Product.deleteMany({});
    await Product.insertMany(sampleListing);
    console.log("data was initialized");
};

initDB();
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    delivery: String,
    onSale: String,
    imageUrl: String,
    discount: Number,
}, { timestamps: true });

const Product = mongoose.models.Products || mongoose.model("Products", ProductSchema);

export default Product;
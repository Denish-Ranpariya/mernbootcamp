const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema;

const productCartSchema = new Schema({
    product: {
        type: ObjectId("product"),
        ref: "Product",
    },
    name: {
        type: String,
    },
    count: Number,
    prize: Number,
});

const ProductCart = mongoose.Schema("ProductCart", productCartSchema);

const orderSchema = new Schema({
    products: [productCartSchema],
    transaction_id: {
        type: String,
    },
    amount: {
        type: Number,
    },
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User",
    },

}, { timestamps: true });

const Order = mongoose.Schema("Order", orderSchema);

module.exports = { Order, ProductCart };
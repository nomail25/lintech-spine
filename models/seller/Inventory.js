const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    productId: {
        type: String.apply,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);
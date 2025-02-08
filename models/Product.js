const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    modelNumber: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    vendor: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    size: { type: String, required: false }, // Example: "15.6 inches"
    weight: { type: String, required: false }, // Example: "2.5kg"
    rating: { type: Number, default: 0, min: 0, max: 5 },
    warrantyDetail: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

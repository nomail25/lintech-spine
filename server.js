const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const adminAuthRoutes = require("./routes/admin/authRoutes");
const sellerAuthRoutes = require("./routes/seller/authRoutes");
const sellerProdRoutes = require("./routes/seller/productRoutes")

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/seller/auth", sellerAuthRoutes);
app.use("/api/seller/product", sellerProdRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

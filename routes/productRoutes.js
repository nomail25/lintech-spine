const express = require("express");
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/", authMiddleware, upload.array("images", 5), addProduct); // Admin only
router.get("/", getAllProducts); // Public
router.get("/:id", getProductById); // Public
router.put("/:id", authMiddleware, upload.array("images", 5), updateProduct); // Admin only
router.delete("/:id", authMiddleware, deleteProduct); // Admin only

module.exports = router;

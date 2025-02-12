const express = require('express');
const { createCart } = require('../../controllers/customer/orderController');
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");


router.post("/addToCart",authMiddleware.authenticateToken, createCart);

module.exports = router;
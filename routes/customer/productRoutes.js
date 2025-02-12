const express = require('express');
const { getAllProducts, getProductByCategory, getProductByVendor } = require('../../controllers/customer/productController');
const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProdByCategory/:name", getProductByCategory);
router.get("/getProductByVendor/:vendor", getProductByVendor)

module.exports = router;
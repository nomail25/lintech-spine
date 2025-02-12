const express = require('express');
const { getAllProducts } = require('../../controllers/customer/productController');
const router = express.Router();

router.get("/getAllProducts", getAllProducts);

module.exports = router;
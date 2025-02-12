const express = require('express');
const bcrypt = require('bcrypt');
const Product = require('../../models/seller/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
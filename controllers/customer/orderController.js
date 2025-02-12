const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cart = require('../../models/customer/Cart')

exports.createCart = async (req, res) => {
    try {
        const customerId = req.user.id;
        const { productIds } = req.body;

        if (!productIds || !Array.isArray(productIds)) {
            return res.status(400).json({ error: 'Invalid product IDs' });
        }
        let cart = await Cart.findOne({ customerId });

        if (cart) {
            cart.productIds.push(...productIds);
        } else {
            cart = new Cart({ customerId, productIds });
        }

        await cart.save();
        res.json({ message: 'Products added to cart', cart });


    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
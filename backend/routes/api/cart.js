const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Product, Cart, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const router = express.Router();


//view cart
router.get("/", async (req, res, next) => {

    const cartQuantity = await Cart.findAll()

    const allProducts = await Product.findAll()

})

//add to cart

//edit cart

//delete from cart

module.exports = router;

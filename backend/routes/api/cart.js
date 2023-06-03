const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Product, Cart, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const router = express.Router();


//view cart
router.get("/", async (req, res, next) => {

    const CurrentInCart = await Cart.findAll()

    // const allProducts = await Product.findAll()

    // console.log("current quantity", CurrentInCart)

    if(!CurrentInCart) {
        const err = newError("products couldn't be found", 404)
        return next(err);
    }

    return res.json(CurrentInCart)

})

//add to cart

//edit cart

//delete from cart

module.exports = router;

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

    if(!CurrentInCart) {
        const err = newError("products couldn't be found", 404)
        return next(err);
    }

    return res.json(CurrentInCart)

})

//add to cart
router.post("/", requireAuth, async (req, res, next) => {

    const userId = req.user.id
    const productId = req.body.id;
    let cartItem = await Cart.findOne({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();
      } else {
        const newCartItem = await Cart.create({
          userId,
          productId,
          quantity: 1,
        });
        cartItem = newCartItem;
      }
      return res.json(cartItem)
})



//edit cart

//delete from cart

module.exports = router;

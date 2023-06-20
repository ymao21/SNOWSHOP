const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Product, Cart, Review, CartProduct} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const router = express.Router();


//view cart
router.get("/:cartId", async (req, res, next) => {

    const {cartId} = req.params


    const CurrentInCart = await Cart.findByPk(cartId, {
        include: CartProduct
    })

    if(!CurrentInCart) {
        const err = newError("products couldn't be found", 404)
        return next(err);
    }

    return res.json(CurrentInCart)

})

//add to cart
router.post("/:cartId", requireAuth, async (req, res, next) => {

    const {cartId } = req.params
    const userId = req.user.id
    const {productId} = req.body;

    let cartItem = await CartProduct.findOne({
        where: {
            cartId : cartId,
          productId: productId,
        },
      });

      if (cartItem) {
        cartItem.quantity += 1;
        await cartItem.save();

      } else {
        const newCartItem = await CartProduct.create({
          cartId,
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

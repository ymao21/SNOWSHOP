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
router.post("/:productId", requireAuth, async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { userId } = req.session.auth;

      const product = await Product.findByPk(productId);
      if (!product) {
        const err = newError("Product not found", 404);
        return next(err);
      }

      const cartItem = await Cart.findOne({
        where: {
          userId,
          productId,
        },
      });

      if (cartItem) {
        await cartItem.update({
          quantity: cartItem.quantity + 1,
        });
      } else {
        await Cart.create({
          userId,
          productId,
          quantity: 1,
        });
      }

      const updatedCartItems = await Cart.findAll({
        where: {
          userId,
        },
        include: Product,
      });

      return res.json(updatedCartItems);
    } catch (err) {
      next(err);
    }
  });



//edit cart

//delete from cart

module.exports = router;

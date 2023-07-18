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
    const CurrentInCart = await Cart.findByPk( cartId , {
      include: Product
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
        include: Product
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
        },
        { include: Product
        }
        );

        cartItem = newCartItem;
      }
      return res.json(cartItem)
})

router.put("/:cartId", requireAuth, async (req, res, next) => {
  const {cartId } = req.params
  const userId = req.user.id
  const {productId, newQuantity} = req.body;

  let cartItem = await CartProduct.findOne({
    where: {
        cartId : cartId,
      productId: productId,
    },
    include: Product
  });

  if (cartItem) {
    cartItem.quantity = newQuantity;

    await cartItem.save();

  } else {
    return res.json({Error: {message: "This item is not in your cart"}})
  }
  return res.json(cartItem)
})


//remove product
router.delete("/:cartId/:productId", requireAuth, async (req, res, next) => {
  const { cartId, productId } = req.params;

  const ProductsInCart = await CartProduct.findOne({
    where: { cartId, productId }
  });

  if(!ProductsInCart){
    const err = new Error("Cart items couldn't be found", 404);
    return next(err);
  }

  await ProductsInCart.destroy()
  return res.json({ message: 'Successfully removed product' });
});


module.exports = router;

const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Product, Cart, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const router = express.Router();

const validateReview = [
    check('body')
        .exists({ checkFalsy: true })
         .withMessage("Review body text is required"),
    check('rating')
        .exists({ checkFalsy: true })
        .withMessage("Rating is required"),
     handleValidationErrors
]

//edit review
router.put("/:reviewId" , requireAuth , validateReview,  async (req, res, next) => {
    const {reviewId} = req.params;
    const userId = req.user.id;
    const {productId, body, rating} = req.body;
    const review = await Review.findByPk(reviewId, {});

    if(!review){
        const err = newError("Review couldn't be found", 404)
        return next(err)
    }

    if(productId) review.productId = productId
    if(body) review.body = body
    if(userId) review.userId = userId


    if(rating) review.rating = rating

    await review.save()

    return res.json(review)
})

//delete reivew
router.delete("/:reviewId", requireAuth, restoreUser, async(req, res, next) => {
    const {reviewId} = req.params;
    const deleteReview = await Review.findByPk(reviewId)

    if(!deleteReview) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err);
    }
    await deleteReview.destroy()
    return res.json({ message: 'Sucessfully deleted' });

    })

    module.exports = router;

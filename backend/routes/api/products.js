const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const {  Product, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors} = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const product = require('../../db/models/product');
const router = express.Router();

const validateQuery = [
    check('page')
        .isInt({ min: 0, max: 10 })
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .isInt({ min: 0, max: 20 })
        .withMessage("Size must be greater than or equal to 0"),
]

//get all products
router.get("/", validateQuery, async (req, res, next) => {

    let page = req.query.page || 0;
    let size = req.query.size || 20;

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {};
    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);

    }
    const products = await Product.findAll({
        ...pagination,
    })

    return res.json({products, page, size})
})

//get products based on user
router.get("/current", async (req, res, next) => {
    const userId = req.user.id

    const products = await Product.findAll({
        where: {
            userId: userId
        }
    })
    return res.json({products})
})

//get product by id
router.get("/:productId", async (req, res, next) => {
    const {productId} = req.params;
    const product = await Product.findByPk(productId,{})

    if(!product){
        const err = newError("Product couldn't be found", 404)
        return next(err)
    }
    return res.json(product)
})

//create product
router.post("/", requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const {name, price, type, color, category,description, previewImageUrl} = req.body

    const newProduct = await Product.create({
        userId,
        name,
        price,
        type,
        color,
        category,
        description,
        previewImageUrl
    })

    return res.json(newProduct)
});

//update product
router.put("/:productId" , requireAuth , async (req, res, next) => {
    const {productId} = req.params;
    const userId = req.user.id;
    const {name, price, type, color, category,description, previewImageUrl} = req.body
    const product = await Product.findByPk(productId);

    if(!product){
        const err = newError("Product couldn't be found", 404)
        return next(err)
    }

    if(userId) product.userId = userId
    if(name) product.name = name
    if(price) product.price = price
    if(type) product.type = type
    if(color) product.color = color
    if(category) product.category = category
    if(description) product.description = description
    if(previewImageUrl) product.previewImageUrl = previewImageUrl

    await product.save()
    return res.json(product)
})

//delete product
router.delete("/:productId", requireAuth, restoreUser, async(req, res, next) => {
    const {productId} = req.params;
    const deleteProduct= await Product.findByPk(productId)

    if(!deleteProduct) {
        const err = new Error("Product couldn't be found")
        err.status = 404
        return next(err);
    }
    await deleteProduct.destroy()
    return res.json({ message: 'Sucessfully deleted' });
    })

//get reviews
router.get("/:productId/reviews", async (req, res, next) =>{
    const {productId} = req.params;
    const product = await Product.findByPk(productId)

    if(!product){
        const err = newError("Product couldn't be found", 404)
        return next(err);
    }
    const review = await Review.findAll({
        where:{
            productId
        },
        include: [
            {model: User,
            attributes: {
                exclude: [
                    "firstName",
                    "lastName",
                    "about",
                    "createdAt",
                    "updatedAt",
                    "hashedPassword",
                    "email",
                ]
            }
              }
            ]
    })

    return res.json(review)
} )

//create reviews
router.post("/:productId/review"), async (req, res, next) => {
    const userId = req.user.id
    const productId = req.params.productId

    const {body} = req.body
    const review = await Product.findByPk(productId)

    if(productId !== null && !review) {
        const err = newError("Product couldn't be found", 404)
        return next(err);
    }
    const newReview = await Review.create({
        userId,
        productId,
        body
    })
    return res.json(newReview)
}



module.exports = router;

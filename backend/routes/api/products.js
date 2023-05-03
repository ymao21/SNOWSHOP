const express = require('express')
const { setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');
const {  Product, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors} = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const product = require('../../db/models/product');
const router = express.Router();

//get products
router.get("/home", async (req, res, next) => {
    const userId = req.user.id

    const products = await Product.findAll({
        where: {
            userId: userId
        }
    })
    return res.json({products})
})

//get product by id
router.get("/home/:productId", async (req, res, next) => {
    const {productId} = req.params;
    const product = await Product.findByPk(productId,{})

    if(!product){
        const err = newError("Product couldn't be found", 404)
        return next(err)
    }
    return res.json(product)
})

//create product
router.post("/home", requireAuth, async (req, res, next) => {
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
router.put("/home/:productId" , requireAuth , async (req, res, next) => {
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
router.delete("/home/:productId", requireAuth, restoreUser, async(req, res, next) => {
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
//create reviews

module.exports = router;

const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Product, Cart, Review} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {newError} = require('../../utils/newError');
const router = express.Router();

router.get("/:q", async (req, res, next) => {

    const searchTerm = req.query.q;

    try {

      const results = await Product.findAll({
        where: {
          title: {
            [Op.iLike]: `%${searchTerm}%`,
          },
        },
      });

      res.json(results);
    } catch (error) {
      console.error('Error performing search:', error);
      res.status(500).json({ error: 'An error occurred while performing the search' });
    }


})



module.exports = router;

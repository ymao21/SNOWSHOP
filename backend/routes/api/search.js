const express = require('express');
const { Product } = require('../../db/models');
const { Op } = require('sequelize');
const router = express.Router();

router.get("/:q", async (req, res, next) => {
  const searchTerm = req.params.q;
  try {
    const results = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${searchTerm}%`,
        },
      },
    });

    res.json(results);
  } catch (error) {
    console.error('Error performing search:', error);

  }
});

module.exports = router;

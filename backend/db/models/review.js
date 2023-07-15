'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId"
      })

      Review.belongsTo(models.Product, {
        foreignKey: "productId",
        // onDelete: "CASCADE",
        // hooks:true
      })
    }
  }
  Review.init({

    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};

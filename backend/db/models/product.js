'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    productId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    previewImageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
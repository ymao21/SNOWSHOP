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

      Product.belongsTo(models.User, {
        foreignKey: "userId"
      })

      Product.hasMany(models.ProductImage,{
        foreignKey: "productImageId",
        onDelete: "CASCADE",
        hooks:true
      })

      Product.hasMany(models.Review,{
        foreignKey: "reivewId",
        onDelete: "CASCADE",
        hooks:true
      })

      Product.belongsToMany(models.Cart,{
        through: models.CartProduct,
        foreignKey: "cardId",
        onDelete: "CASCADE",
        hooks:true
      })

      Product.hasMany(models.CartProduct, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        hooks:true
      })


    }
  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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

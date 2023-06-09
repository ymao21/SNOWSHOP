'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartProduct.hasMany(models.Cart,{
        foreignKey: "id",
        onDelete: "CASCADE",
        hooks:true
      });

      CartProduct.hasMany(models.Product,{
        foreignKey: "id",
        onDelete: "CASCADE",
        hooks:true
      });
    }
  }
  CartProduct.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};

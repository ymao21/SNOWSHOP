'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.hasMany(models.CartProduct,{
        foreignKey: "productId",
        onDelete: "CASCADE",
        hooks:true
      })

      Cart.hasMany(models.Product,{
        through: models.CartProduct,
        foreignKey: "productId",
        onDelete: "CASCADE",
        hooks:true
      })

      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks:true
      })
    }
  }
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};

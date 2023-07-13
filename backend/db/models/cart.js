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

      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        // onDelete: "CASCADE",
        // hooks:true
      })

      Cart.belongsToMany(models.Product, {
        through: models.CartProduct,
        foreignKey: "cartId",
        // onDelete: "CASCADE",
        // hooks:true
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
    checkedOut: {
      type: DataTypes.BOOLEAN}
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};

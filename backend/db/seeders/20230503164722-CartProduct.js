'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'CartProducts';
    await queryInterface.bulkInsert(options, [
      {
        cartId: 1,
        productId: 1,
        quantity: 2,
      },
      {
        cartId: 2,
        productId: 2,
        quantity: 1,
      },
      {
        cartId: 3,
        productId: 3,
        quantity: 3,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'CartProducts';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  }
};

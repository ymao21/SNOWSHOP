'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Carts';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        quantity: 2,
        productId: 1,
      },
      {
        userId: 1,
        quantity: 1,
        productId: 2,
      },
      {
        userId: 1,
        quantity: 1,
        productId: 3,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Carts';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  }
};

'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;

}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        userId: 1,
        productId: 1,
        rating: 3.5,
        body: 'review 1',
      },
      {
        userId: 1,
        productId: 2,
        rating: 3.0,
        body: 'review 2',
      },
      {
        userId: 1,
        productId: 2,
        rating: 4.5,
        body: 'review 3',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {} , {});
  }
};

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
        checkedOut: false
      },
      {
        userId: 1,
        checkedOut: true
      },
      {
        userId: 1,
        checkedOut: true
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Carts';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  }
};

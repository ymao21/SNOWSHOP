'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ProductImages';
    await queryInterface.bulkInsert(options, [
      {
        url: "url" ,
        productId: 1
      },
      {
        url: "url2" ,
        productId: 2
      },
      {
        url: "url3" ,
        productId: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ProductImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  }
};

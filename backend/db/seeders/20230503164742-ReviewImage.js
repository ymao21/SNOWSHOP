'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        url: "url" ,
        reviewId: 1
      },
      {
        url: "url2" ,
        reviewId: 2
      },
      {
        url: "url3" ,
        reviewId: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {}, {});
  }
};

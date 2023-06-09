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
        rating: 3,
        body: 'Awesome board! If you are looking to advance your skills to more of an intermediate rider this is for you!!',
      },
      {
        userId: 1,
        productId: 2,
        rating: 3,
        body: 'Fits perfect for my style. Easy to control even on icy parts.',
      },
      {
        userId: 1,
        productId: 1,
        rating: 4,
        body: 'Love it, my first board',
      },
      {
        userId: 1,
        productId: 2,
        rating: 3,
        body: 'Absolutely gorgeous board!',
      },
      {
        userId: 1,
        productId: 1,
        rating: 3,
        body: 'Beginner friendly',
      },
      {
        userId: 1,
        productId: 1,
        rating: 3,
        body: 'Wish it was smaller',
      },

      {
        userId: 1,
        productId: 2,
        rating: 5,
        body: 'Fantastic',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {} , {});
  }
};

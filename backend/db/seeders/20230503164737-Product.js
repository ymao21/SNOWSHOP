'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Products';
    await queryInterface.bulkInsert(options, [
      {
        name: "Women's Burton Yeasayer Flat Top Snowboard",
        price: 499.95,
        type: "snowboard",
        color: "pink",
        category: "women",
        description: "Twin shape is perfectly symmetrical for a balanced ride so you can spin and stomp with outstanding stability whether you're riding regular or switch",
        previewImageUrl: "image URL",
        userId: 1,
      },
      {
        name: "Men's Burton Snowboard",
        price: 599.95,
        type: "snowboard",
        color: "black",
        category: "men",
        description: "description2",
        previewImageUrl: "image URL",
        userId: 1,
      },
      {
        name: "Used Snowboard",
        price: 199.95,
        type: "snowboard",
        color: "white",
        category: "women",
        description: "description3",
        previewImageUrl: "image URL",
        userId: 1,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Products';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, { }, {});
  }
};

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
        previewImageUrl: "https://www.burton.com/static/product/W23/13222108000_1.png?impolicy=bglt&imwidth=384",
        userId: 1,
      },
      {
        name: "Burton 1996 Dolphin Camber Snowboard",
        price: 609.95,
        type: "snowboard",
        color: "purple",
        category: "women",
        description: "This retro edition board shares the original graphics and shape, built with a modern layup.",
        previewImageUrl: "https://www.burton.com/static/product/S24/23718100000_1.png?impolicy=bglt&imwidth=384",
        userId: 1,
      },
      {
        name: "Used Burton 1987 Elite Flat Top Snowboard",
        price: 299.95,
        type: "snowboard",
        color: "blue",
        category: "men",
        description: "This retro edition board celebrates the design that made standing sideways accessible to everyone. It combines modern materials with throwback graphics and the original shape including its trademark swallow tail.",
        previewImageUrl: "https://www.burton.com/static/product/S24/23716100000_1.png?impolicy=bglt&imwidth=384",
        userId: 1,
      },
      {
        name: "Women's Burton Ritual Step On Sweetspot Snowboard Boots",
        price: 409.95,
        type: "snowboard boots",
        color: "blue",
        category: "women",
        description: "its soft flex and Speed Zone lacing in the lower foot balance a relaxed freestyle flex with secure foot hold that responds as you need it to",
        previewImageUrl: "https://www.burton.com/static/product/S24/23753100400_1.png?impolicy=bglt&imwidth=384",
        userId: 1,
      },
      {
        name: "Used Women's Burton Felix BOA Snowboard Boots",
        price: 199.95,
        type: "snowboard",
        color: "white",
        category: "women",
        description: "The micro-adjustable fit of Dual-Zone BOA Fit System lets you independently tension upper and lower zones to match your needs. ",
        previewImageUrl: "https://www.burton.com/static/product/W23/13179108020_1.png?impolicy=bglt&imwidth=384",
        userId: 1,
      },
      {
        name: "Men's Burton Carbonate GORE-TEX 3L Jacket",
        price: 299.95,
        type: "jacket",
        color: "white",
        category: "men",
        description: "The men's Burton Carbonate GORE-TEX 3L Jacket focuses on fit and trusted weather protection, so you can ride all day and all season long.",
        previewImageUrl: "https://www.burton.com/static/product/W23/23426100020_4.png?impolicy=bglt&imwidth=384",
        userId: 1,
      },
      {
        name: "Used Men's Burton Carbonate GORE-TEX 2L Pants",
        price: 199.95,
        type: "pants",
        color: "blue",
        category: "men",
        description: "waterproof and barely worn. very warm with high breathability",
        previewImageUrl: "https://www.burton.com/static/product/W23/23432100400_4.png?impolicy=bglt&imwidth=384",
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

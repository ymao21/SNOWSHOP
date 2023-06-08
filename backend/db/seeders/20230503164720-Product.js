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
      },
      {
        name: "Performance lightweight socks",
        price: 30.9,
        type: "pants",
        color: "black",
        category: "men",
        description: "A snowboarding sock that actually stays put and keeps the comfort and breathability coming all-ride long.",
        previewImageUrl: "https://www.burton.com/static/product/W23/21219103401_1.png?impolicy=bglt&imwidth=282",
        userId: 1,
      },
      {
        name: "Used Women's Jacket",
        price: 400.95,
        type: "jacket",
        color: "green",
        category: "women",
        description: "The storm hood blocks out wind and snow without blocking your vision.",
        previewImageUrl: "https://www.burton.com/static/product/W23/21282103302_1.png?impolicy=bglt&imwidth=282",
        userId: 1,
      },
      {
        name: "Women's Burton Treeline GORE-TEX 2L Jacket",
        price: 439.95,
        type: "jacket",
        color: "red",
        category: "women",
        description: "this jacket keeps you dry and warm",
        previewImageUrl: "https://www.burton.com/static/product/W23/22812101600_1.png?impolicy=bglt&imwidth=282",
        userId: 1,
      },
      {
        name: "Recycled Rib Beanie",
        price: 439.95,
        type: "other",
        color: "blue",
        category: "men",
        description: "Clean and simple. Soft and warm.",
        previewImageUrl: "https://www.burton.com/static/product/W23/23353100400_1.png?impolicy=bglt&imwidth=282",
        userId: 1,
      },
      {
        name: "Men's Stockrun Warmest Hooded Full-Zip Fleece",
        price: 199.95,
        type: "jacket",
        color: "black",
        category: "men",
        description: "Fuzzy fleece for the kind of warmth that gets you from first chair to last in comfort.",
        previewImageUrl: "https://www.burton.com/static/product/S24/23387100001_1.png?impolicy=bglt&imwidth=282",
        userId: 1,
      },
      {
        name: "Mitten",
        price: 70.88,
        type: "Mitten",
        color: "black",
        category: "men",
        description: "the warmest mitt Burton makes.",
        previewImageUrl: "https://www.burton.com/static/product/W23/23747100001_2.png?impolicy=bglt&imwidth=282",
        userId: 1,
      },
      {
        name: "Women's Pyne 2L Jacket",
        price: 289.98,
        type: "jacket",
        color: "purple",
        category: "women",
        description: "This rider-designed jacket can fly solo on mild days or slide over the top of your fave insulator in the dead of winter. The women's Burton Pyne Jacket is a waterproof, breathable shell with just the right amount of stretch for a light, natural feel and plenty of room for layering. It's the jacket you can grab for any day on the mountain complete with must-haves like pit zips for climate control and plenty of easy-access pockets for your stuff.",
        previewImageUrl: "https://www.burton.com/static/product/W23/23363100500_1.png?impolicy=bglt&imwidth=282",
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

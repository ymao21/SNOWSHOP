'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    await queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo',
        firstName: 'Demo ',
        lastName: 'user',
        about: "seller description",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'james@user.io',
        username: 'jamess123',
        firstName: 'James ',
        lastName: 'Smith',
        about: "seller description",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'olivia@user.io',
        username: 'olives123',
        firstName: 'Olivia ',
        lastName: 'Clark',
        about: "seller description",
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo', 'jamess123', 'olives123'] }
    }, {});
  }
};

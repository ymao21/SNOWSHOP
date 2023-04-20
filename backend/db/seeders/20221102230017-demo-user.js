'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo',
        firstName: 'Demo ',
        lastName: 'user',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'james@user.io',
        username: 'jamess123',
        firstName: 'James ',
        lastName: 'Smith',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'olivia@user.io',
        username: 'olives123',
        firstName: 'Olivia ',
        lastName: 'Clark',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo', 'jamess123', 'olives123'] }
    }, {});
  }
};

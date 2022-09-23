'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'fiddle@fiddle.io',
        username: 'fiddlefan',
        firstName: "John",
        lastName: "Marston",
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'blues@user.io',
        username: 'bluesfan',
        firstName: "Arthur",
        lastName: "Morgan",
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

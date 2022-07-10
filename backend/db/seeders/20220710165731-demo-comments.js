'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId: 1,
        body: "hey I just met you"
      },
      {
        userId: 1,
        songId: 1,
        body: "and this is crazy"
      }
    ]);
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

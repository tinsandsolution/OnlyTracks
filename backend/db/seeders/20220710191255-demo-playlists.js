'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Playlists', [
      {
        userId: 1,
        name: 'Hip Mixtape No. 9',
        previewImage: 'black-and-white.jpg'
      },
      {
        userId: 2,
        name: 'Hip Mixtape No. 10',
        previewImage: 'black-and-white.jpg'
      },
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

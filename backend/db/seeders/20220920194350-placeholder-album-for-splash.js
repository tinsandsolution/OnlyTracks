'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Albums', [
      {
        userId: 3,
        title: 'Splash Zone',
        description: 'In loving memory of Quinn',
        previewImage: 'https://media.discordapp.net/attachments/1017492963720433868/1021869922122477638/371990064_Photo_for_an_album_called__Splash_.png'
      }
    ])
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

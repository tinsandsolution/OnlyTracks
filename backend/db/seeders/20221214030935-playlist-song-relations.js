'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('PlaylistSongs', [
      {
        songId: 23,
        playlistId: 1,
      },
      {
        playlistId: 1,
        songId: 22,
      },
      {
        playlistId: 1,
        songId: 21,
      },
      {
        playlistId: 1,
        songId: 24,
      },
      {
        playlistId: 1,
        songId: 25,
      },
      {
        playlistId: 1,
        songId: 26,
      },
      {
        playlistId: 1,
        songId: 27,
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

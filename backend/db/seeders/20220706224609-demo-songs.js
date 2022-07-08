'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: 'Last Great American Dynasty',
        description: 'Its about the rockefellers',
        url: "sdafasdfdsafsd2",
        previewImage: 'black-and-white.jpg'
      },
      {
        userId: 1,
        albumId: 1,
        title: 'Look What You Made Me Do',
        description: 'Its about revenge',
        url: "sdafasdfdsafsd",
        previewImage: 'black-and-white.jpg'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Songs', {
      username: { [Op.in]: ['Last Great American Dynasty', 'Look What You Made Me Do'] }
    }, {});
  }
};

'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Albums', [
      {
        artistId: 1,
        title: 'SpeakNow',
        description: 'Its about talking',
        previewImage: 'taylorswift.jpg'
      },
      {
        artistId: 1,
        title: 'Reputation',
        description: 'Its about kanye',
        previewImage: 'black-and-white.jpg'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Albums', {
      username: { [Op.in]: ['Speak Now', 'Reputation'] }
    }, {});
  }
};

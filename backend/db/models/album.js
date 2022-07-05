'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  album.init({
    artistId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 256]
      }
    },
    previewImage: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 256]
      }
    }
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};
